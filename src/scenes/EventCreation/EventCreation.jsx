import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CREATE_EVENT_MUTATION, PIN_TICKET_IMAGE_TO_IPFS_MUTATION } from '@graphql/mutations';
import { PageContainer } from '@components';
import { NFTContext } from '@providers';
import GeneralInfo from './components/GeneralInfo';
import Location from './components/Location';
import DateTime from './components/DateTime';
import { TicketCreation, DEFAULT_TICKET_IMAGE_IPFS_HASH } from './components/TicketCreation';

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
    locationType: {
        value: 'venue',
        error: false,
    },
    location: {
        value: '',
        error: false,
    },
    imageFile: {
        value: undefined,
        error: false,
    },
};

const DEFAULT_EVENT_DATE = {
    start: new Date(),
    end: new Date(),
    error: false,
};

const useStyles = makeStyles((theme) => ({
    submit: {
        paddingBottom: theme.spacing(3),
    },
}));

const variables = {};
const EventCreation = (props) => {
    const classes = useStyles();
    const [form, setForm] = useState(DEFAULT_EVENT_FORM);
    const [date, setDate] = useState(DEFAULT_EVENT_DATE);
    const [tickets, setTickets] = useState([]);
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);
    const [pinTicketImageMutation] = useMutation(PIN_TICKET_IMAGE_TO_IPFS_MUTATION);

    const { createTicketNFTs } = useContext(NFTContext);

    const isValueValid = (value) => {
        return value && (value.length > 0 || value.size);
    };

    const areDatesValid = () => {
        return date.start <= date.end;
    };

    const { history } = props;

    const handleNextButtonClick = () => {
        Object.keys(form).forEach((key) => {
            variables[key] = form[key].value;
        });
        history.push({ pathname: '/createEvent/createTicket' });
    };

    const isFormValid = () => {
        let isValid = true;

        Object.keys(form).forEach((key) => {
            if (key === 'location') {
                if (form.location.value === '' && form.locationType.value === 'venue') {
                    isValid = false;
                }
            } else if (form[key].error || !isValueValid(form[key].value)) {
                isValid = false;
            }
        });
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
        setDate({ ...date, error: !areDatesValid() });
    };

    const handleCreateTicket = (ticketData) => {
        setTickets([...tickets, ticketData]);
    };

    const handleFormChange = (field, value) => {
        setForm({ ...form, [field]: { value, error: !isValueValid(value) } });
    };

    const handleDateChange = (field, value) => {
        let error;
        if (field === 'start') error = value > date.end;
        else error = value < date.start;
        setDate({ ...date, [field]: value, error });
    };

    const handleSubmit = async () => {
        if (isFormValid()) {
            let eventName = '';
            Object.keys(form).forEach((key) => {
                variables[key] = form[key].value;
                if (key === 'name') {
                    eventName = form[key].value;
                }
            });
            variables.startDate = date.start;
            variables.endDate = date.end;
            if (variables.locationType !== 'venue') variables.location = null;

            const createEventResult = await createEvent({ variables: { ...variables } });

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
                            eventId: createEventResult.data.createEvent.id,
                            eventName,
                            image: ticketImageIpfsHash,
                        },
                        maxSupply: ticket.quantity,
                    };
                }),
            );

            await createTicketNFTs(ticketNFTs);
            props.history.push('/');
        } else {
            updateFormErrors();
        }
        history.push({ pathname: '/' });
    };

    return (
        <PageContainer title="Create event">
            <Switch>
                <Route path="/createEvent/general">
                    <Grid container spacing={3} direction="column" justify="flex-start">
                        <Grid item xs={12}>
                            <GeneralInfo value={form} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Location value={form} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <DateTime value={date} onChange={handleDateChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify="center" className={classes.submit}>
                                <Button variant="contained" color="primary" onClick={handleNextButtonClick}>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Route>

                <Route
                    path="/createEvent/createTicket"
                    render={() => (
                        <Grid item xs={12}>
                            <TicketCreation
                                {...props}
                                handleSubmit={handleSubmit}
                                tickets={tickets}
                                onCreateTicket={handleCreateTicket}
                            />
                        </Grid>
                    )}
                />
            </Switch>
        </PageContainer>
    );
};

EventCreation.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(EventCreation);
