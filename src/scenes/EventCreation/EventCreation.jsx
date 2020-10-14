import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
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
    startDate: {
        value: new Date(),
        error: false,
    },
    endDate: {
        value: new Date(),
        error: false,
    },
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

const EventCreation = () => {
    const classes = useStyles();
    const [form, setForm] = useState(DEFAULT_EVENT_FORM);
    const [eventImage, setEventImage] = useState(undefined);
    const [tickets, setTickets] = useState([]);
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    const handleCreateTicket = (ticketData) => {
        setTickets([...tickets, ticketData]);
    };

    const handleFormChange = (field, value) => {
        setForm({ ...form, [field]: { value, error: false } });
    };

    const handleSubmit = async () => {
        const variables = {};
        let eventName = '';
        Object.keys(form).forEach((key) => {
            variables[key] = form[key].value;
            if (key === 'name') {
                eventName = form[key].value;
            }
        });

        createEvent({ variables: { ...variables, imageFile: eventImage[0] } });
        await handleCreateCollection();
        await handleCreateSchema();
        if (tickets.length > 0) {
            tickets.forEach(function (ticket) {
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
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3} direction="column" justify="flex-start">
                <Grid item xs={12}>
                    <Typography variant="h3">Create event</Typography>
                </Grid>
                <Grid item xs={12}>
                    <GeneralInfo value={form} onChange={handleFormChange} onImageUpload={setEventImage} />
                </Grid>
                <Grid item xs={12}>
                    <Location value={form} onChange={handleFormChange} />
                </Grid>
                <Grid item xs={12}>
                    <DateTime value={form} onChange={handleFormChange} />
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

// export default connect(
//   null,
//   {  }
// )(EventCreation);

export default EventCreation;
