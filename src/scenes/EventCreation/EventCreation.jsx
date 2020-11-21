import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Grid, Stepper, StepLabel, Step, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
    CREATE_EVENT_MUTATION,
    PIN_TICKET_IMAGE_TO_IPFS_MUTATION,
    LINK_NFT_TEMPLATES_TO_EVENT_MUTATION,
} from '@graphql/mutations';
import { PageContainer, EventInformationForm, EventTicketsForm } from '@components';
import { NFTContext } from '@providers';
import { DEFAULT_TICKET_IMAGE_IPFS_HASH } from '@constants';
import { Confirm } from './components/Confirm';

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
    image: {
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
    stepButtonContainer: {
        padding: '60px 16px 16px 16px',
    },
    stepButton: {
        padding: 15,
    },
    nextButton: {
        fontWeight: 900,
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
    const [generalInfoForm, setGeneralInfoForm] = useState(DEFAULT_EVENT_FORM);
    const [locationForm, setLocationForm] = useState(DEFAULT_EVENT_LOCATION);
    const [dateForm, setDateForm] = useState(DEFAULT_EVENT_DATE);
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
        return dateForm.start <= dateForm.end;
    };

    const isLocationValid = () => {
        if (locationForm.locationType.value === 'venue') {
            return locationForm.location.value !== '';
        }
        return true;
    };

    const { history } = props;

    const handleBackStep = () => {
        history.goBack();
    };

    const isFormValid = () => {
        let isValid = true;

        Object.keys(generalInfoForm).forEach((key) => {
            if (generalInfoForm[key].error || !isValueValid(generalInfoForm[key].value)) {
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
        Object.keys(generalInfoForm).forEach((key) => {
            updatedForm[key] = {
                value: generalInfoForm[key].value,
                error: !isValueValid(generalInfoForm[key].value),
            };
        });
        setGeneralInfoForm(updatedForm);
        setLocationForm({ ...locationForm, location: { ...locationForm.location, error: !isLocationValid() } });
        setDateForm({ ...dateForm, error: !areDatesValid() });
    };

    const handleGeneralInfoNextButtonClick = () => {
        if (isFormValid()) {
            Object.entries(generalInfoForm).forEach(([key, value]) => {
                variables[key] = value;
            });
            history.push({ pathname: '/createEvent/createTicket' });
        } else {
            updateFormErrors();
        }
    };

    const handleTicketsNextButtonClick = () => {
        history.push({ pathname: '/createEvent/confirm' });
    };

    const handleCreateTicket = (ticketData) => {
        setTickets([...tickets, ticketData]);
    };

    const handleGeneralInfoFormChange = (field, value) => {
        setGeneralInfoForm({ ...generalInfoForm, [field]: { value, error: !isValueValid(value) } });
    };

    const handleLocationFormChange = (field, value) => {
        setLocationForm({ ...locationForm, [field]: { value, error: !isValueValid(value) } });
    };

    const handleDateFormChange = (field, value) => {
        let error;
        if (field === 'start') error = value > dateForm.end;
        else error = value < dateForm.start;
        setDateForm({ ...dateForm, [field]: value, error });
    };

    const handleSubmit = async () => {
        let eventName = '';
        Object.keys(generalInfoForm).forEach((key) => {
            if (key === 'image') {
                variables.imageFile = generalInfoForm[key].value;
            } else {
                variables[key] = generalInfoForm[key].value;
            }
            if (key === 'name') {
                eventName = generalInfoForm[key].value;
            }
        });
        variables.location = locationForm.location.value;
        variables.locationType = locationForm.locationType.value;
        variables.startDate = dateForm.start;
        variables.endDate = dateForm.end;
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
                        eventId,
                        image: ticketImageIpfsHash,
                    },
                    maxSupply: ticket.quantity,
                    price: ticket.price,
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
                        <EventInformationForm
                            generalInfoForm={generalInfoForm}
                            locationForm={locationForm}
                            dateForm={dateForm}
                            onGeneralInfoFormChange={handleGeneralInfoFormChange}
                            onLocationFormChange={handleLocationFormChange}
                            onDateFormChange={handleDateFormChange}
                        />
                        <Grid container justify="flex-end" className={classes.stepButtonContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={`${classes.stepButton} ${classes.nextButton}`}
                                onClick={handleGeneralInfoNextButtonClick}
                            >
                                {t('next')}
                            </Button>
                        </Grid>
                    </Route>

                    <Route path="/createEvent/createTicket">
                        <EventTicketsForm tickets={tickets} onCreateTicket={handleCreateTicket} />
                        <Grid container justify="space-between" className={classes.stepButtonContainer}>
                            <Button
                                variant="outlined"
                                className={classes.stepButton}
                                color="primary"
                                onClick={handleBackStep}
                            >
                                {t('back')}
                            </Button>
                            <Button
                                variant="contained"
                                className={`${classes.stepButton} ${classes.nextButton}`}
                                color="primary"
                                onClick={handleTicketsNextButtonClick}
                            >
                                {t('next')}
                            </Button>
                        </Grid>
                    </Route>

                    <Route path="/createEvent/confirm">
                        <Confirm
                            history={history}
                            tickets={tickets}
                            handleSubmit={handleSubmit}
                            handleBackStep={handleBackStep}
                            variables={variables}
                            date={dateForm}
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
