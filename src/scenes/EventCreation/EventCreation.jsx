import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CREATE_EVENT_MUTATION } from '@graphql/mutations';
import GeneralInfo from './components/GeneralInfo';
import Location from './components/Location';
import DateTime from './components/DateTime';
import TicketCreation from './components/TicketCreation/TicketCreation';
import { handleCreateCollection, handleCreateSchema, handleCreateTemplate } from '../../services/nft-api';

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
    root: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    submit: {
        paddingBottom: theme.spacing(3),
    },
}));

const EventCreation = (props) => {
    const classes = useStyles();
    const [form, setForm] = useState(DEFAULT_EVENT_FORM);
    const [date, setDate] = useState(DEFAULT_EVENT_DATE);
    const [tickets, setTickets] = useState([]);
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    const isValueValid = (value) => {
        return value && (value.length > 0 || value.size);
    };

    const areDatesValid = () => {
        return date.start <= date.end;
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
            const variables = {};
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
            await createEvent({ variables: { ...variables } });
            await handleCreateCollection();
            await handleCreateSchema();
            if (tickets.length > 0) {
                tickets.forEach((ticket) => {
                    handleCreateTemplate(
                        ticket.name,
                        ticket.description,
                        ticket.quantity,
                        ticket.price,
                        ticket.startDate,
                        ticket.endDate,
                        eventName,
                    );
                });
            }
            props.history.push('/');
        } else {
            updateFormErrors();
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3} direction="column" justify="flex-start">
                <Grid item xs={12}>
                    <Typography variant="h3">Create event</Typography>
                </Grid>
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
                    <TicketCreation tickets={tickets} onCreateTicket={handleCreateTicket} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center" className={classes.submit}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Create Event
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

EventCreation.propTypes = {
    history: PropTypes.node.isRequired,
};

export default withRouter(EventCreation);
