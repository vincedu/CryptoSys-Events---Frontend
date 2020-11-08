import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Grid, Stepper, StepLabel, Step } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
    CREATE_EVENT_MUTATION,
    PIN_TICKET_IMAGE_TO_IPFS_MUTATION,
    LINK_NFT_TEMPLATES_TO_EVENT_MUTATION,
} from '@graphql/mutations';
import { PageContainer } from '@components';
import { NFTContext } from '@providers';
import { TicketCreation, DEFAULT_TICKET_IMAGE_IPFS_HASH } from './components/TicketCreation';
import { Confirm } from './components/Confirm';
import { Information } from './components/Information';

const DEFAULT_EVENT_FORM = {
    name: {
        value: '',
        error: false,
    },
    description: {
        value: '',
        error: false,
    },
    type: {
        value: '',
        error: false,
    },
    category: {
        value: '',
        error: false,
    },
    languages: {
        value: [],
        error: false,
    },
    tags: {
        value: [],
        error: false,
    },
    imageFile: {
        value: undefined,
        error: false,
    },
};

const DEFAULT_EVENT_LOCATION = {
    location: {
        value: '',
        error: false,
    },
    locationType: {
        value: 'venue',
        error: false,
    },
};

const DEFAULT_EVENT_DATE = {
    start: new Date(),
    end: new Date(),
    error: false,
};

const useStyles = makeStyles(() => ({
    stepper: {
        backgroundColor: 'transparent',
    },
}));

const variables = {};
const EventCreation = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    switch (window.location.pathname) {
        case '/createEvent/createTicket':
            if (activeStep !== 1) {
                setActiveStep(1);
            }
            break;
        case '/createEvent/confirm':
            if (activeStep !== 2) {
                setActiveStep(2);
            }
            break;
        case '/createEvent/general':
            if (activeStep !== 0) {
                setActiveStep(0);
            }
            break;
        default:
    }

    const classes = useStyles();
    const [form, setForm] = useState(DEFAULT_EVENT_FORM);
    const [location, setLocation] = useState(DEFAULT_EVENT_LOCATION);
    const [date, setDate] = useState(DEFAULT_EVENT_DATE);
    const [tickets, setTickets] = useState([]);
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);
    const [pinTicketImageMutation] = useMutation(PIN_TICKET_IMAGE_TO_IPFS_MUTATION);
    const [linkNftTemplatesToEvent] = useMutation(LINK_NFT_TEMPLATES_TO_EVENT_MUTATION);
    const { t } = useTranslation();

    const PROGRESSION_STEPS = t('createEvent.stepper', { returnObjects: true });

    const { createTicketNFTs } = useContext(NFTContext);

    const isValueValid = (value) => {
        return value && (value.length > 0 || value.size);
    };

    const areDatesValid = () => {
        return date.start <= date.end;
    };

    const isLocationValid = () => {
        if (location.locationType.value === 'venue') {
            return location.location.value !== '';
        }
        return true;
    };

    const { history } = props;

    const handleBackStep = () => {
        history.goBack();
    };

    const isFormValid = () => {
        let isValid = true;

        Object.keys(form).forEach((key) => {
            if (form[key].error || !isValueValid(form[key].value)) {
                isValid = false;
            }
        });
        if (!isLocationValid()) {
            isValid = false;
        }
        if (!areDatesValid()) {
            isValid = false;
        }
        return isValid;
    };

    const updateFormErrors = () => {
        const updatedForm = {};
        Object.keys(form).forEach((key) => {
            updatedForm[key] = {
                value: form[key].value,
                error: !isValueValid(form[key].value),
            };
        });
        setForm(updatedForm);
        setLocation({ ...location, location: { ...location.location, error: !isLocationValid() } });
        setDate({ ...date, error: !areDatesValid() });
    };

    const handleNextButtonClick = () => {
        if (isFormValid()) {
            Object.entries(form).forEach(([key, value]) => {
                variables[key] = value;
            });
            history.push({ pathname: '/createEvent/createTicket' });
        } else {
            updateFormErrors();
        }
    };

    const handleCreateTicket = (ticketData) => {
        setTickets([...tickets, ticketData]);
    };

    const handleFormChange = (field, value) => {
        setForm({ ...form, [field]: { value, error: !isValueValid(value) } });
    };

    const handleLocationChange = (field, value) => {
        setLocation({ ...location, [field]: { value, error: !isValueValid(value) } });
    };

    const handleDateChange = (field, value) => {
        let error;
        if (field === 'start') error = value > date.end;
        else error = value < date.start;
        setDate({ ...date, [field]: value, error });
    };

    const handleSubmit = async () => {
        let eventName = '';
        Object.keys(form).forEach((key) => {
            variables[key] = form[key].value;
            if (key === 'name') {
                eventName = form[key].value;
            }
        });
        variables.location = location.location.value;
        variables.locationType = location.locationType.value;
        variables.startDate = date.start;
        variables.endDate = date.end;
        if (variables.locationType !== 'venue') variables.location = null;

        const createEventResult = await createEvent({ variables: { ...variables } });
        const eventId = createEventResult.data.createEvent.id;

        const ticketNFTs = await Promise.all(
            tickets.map(async (ticket) => {
                let ticketImageIpfsHash = DEFAULT_TICKET_IMAGE_IPFS_HASH;

                if (ticket.image) {
                    const pinTicketImageResult = await pinTicketImageMutation({
                        variables: { file: ticket.image, ticketName: ticket.name, eventName },
                    });
                    ticketImageIpfsHash = pinTicketImageResult.data.pinTicketImageToIpfs.ipfsHash;
                }

                return {
                    ticketData: {
                        name: ticket.name,
                        description: ticket.description,
                        price: ticket.price,
                        startDate: ticket.startDate.toString(),
                        endDate: ticket.endDate.toString(),
                        eventId,
                        eventName,
                        image: ticketImageIpfsHash,
                    },
                    maxSupply: ticket.quantity,
                };
            }),
        );

        const { templateIds } = await createTicketNFTs(ticketNFTs);
        await linkNftTemplatesToEvent({ variables: { eventId, templateIds } });
        props.history.push('/');
    };

    return (
        <PageContainer title={t('createEvent.title')}>
            <Grid item xs={12} sm={10} md={8} style={{ margin: 'auto' }}>
                <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
                    {Object.values(PROGRESSION_STEPS).map((name) => (
                        <Step key={name}>
                            <StepLabel>{name}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
            <Grid item xs={12} style={{ margin: 'auto' }}>
                <Switch>
                    <Route path="/createEvent/general">
                        <Information
                            history={history}
                            handleNextButtonClick={handleNextButtonClick}
                            form={form}
                            value={location}
                            date={date}
                            handleFormChange={handleFormChange}
                            handleDateChange={handleDateChange}
                            handleLocationChange={handleLocationChange}
                        />
                    </Route>

                    <Route path="/createEvent/createTicket">
                        <TicketCreation
                            history={history}
                            tickets={tickets}
                            onCreateTicket={handleCreateTicket}
                            handleBackStep={handleBackStep}
                        />
                    </Route>

                    <Route path="/createEvent/confirm">
                        <Confirm
                            history={history}
                            tickets={tickets}
                            handleSubmit={handleSubmit}
                            handleBackStep={handleBackStep}
                            variables={variables}
                            date={date}
                        />
                    </Route>
                </Switch>
            </Grid>
        </PageContainer>
    );
};

EventCreation.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(EventCreation);
