import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createEventMutation } from '@queries/queries';
import GeneralInfo from './components/GeneralInfo';
import Location from './components/Location';
import DateTime from './components/DateTime';
// import TicketCreation from './TicketCreation/TicketCreation';
import theme from '../../theme';

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

const useStyles = makeStyles((t) => ({
    root: () => ({
        backgroundColor: t.palette.background.default,
    }),
    submit: {
        paddingBottom: 20,
    },
}));

const EventCreation = (props) => {
    const classes = useStyles(theme);
    const [form, setForm] = useState(DEFAULT_EVENT_FORM);
    const [eventImage, setEventImage] = useState(undefined);

    const handleFormChange = (field, value) => {
        setForm({ ...form, [field]: { value, error: false } });
    };

    const handleSubmit = () => {
        const variables = {};
        Object.keys(form).forEach((key) => {
            variables[key] = form[key].value;
        });

        props.mutate({ variables: { ...variables, imageFile: eventImage[0] } });
    };
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch" className={classes.root}>
            <Typography variant="h3">Création d&apos;événement</Typography>
            <Grid item sm={12}>
                <GeneralInfo value={form} onChange={handleFormChange} onImageUpload={setEventImage} />
                <Location value={form} onChange={handleFormChange} />
                <DateTime value={form} onChange={handleFormChange} />
                <Grid container justify="center" className={classes.submit}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Créer
                    </Button>
                </Grid>
                {/* <TicketCreation /> À remettre ou à déplacer dans une autre page? */}
            </Grid>
        </Grid>
    );
};

// export default connect(
//   null,
//   {  }
// )(EventCreation);
EventCreation.propTypes = {
    mutate: PropTypes.func.isRequired,
};

export default graphql(createEventMutation)(EventCreation);
