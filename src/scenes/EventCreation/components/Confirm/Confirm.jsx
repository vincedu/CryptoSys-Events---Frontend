import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, makeStyles, Hidden } from '@material-ui/core';
import { TitledPaper } from '@components';
import { useTranslation } from 'react-i18next';
import { PlaylistAddCheck } from '@material-ui/icons';
import EventItem from '../../../EventList/components/EventItem';

const useStyles = makeStyles((theme) => ({
    submit: {
        paddingTop: 60,
    },
    lowerButton: {
        padding: 15,
    },
    special: {
        fontWeight: 900,
    },
    icon: {
        fontSize: '5em',
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            fontSize: '3em',
        },
    },
    iconGrid: {
        paddingTop: '20px',
        color: 'lightgrey',
    },
    other: {
        opacity: 0.5,
    },
    eventItems: {
        padding: '100px 0',
    },
}));

const event = {
    key: '1',
    id: '1',
    name: 'Event Title',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec porttitor dolor. Aliquam ac posuere ipsum. Phasellus ac augue a nulla pharetra.',
    startDate: new Date().toISOString(),
    image: 'https://miro.medium.com/max/1400/0*RE_lW738kmA3SuW2.png',
    type: 'Free',
};

export const Confirm = (props) => {
    Confirm.propTypes = {
        handleBackStep: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        variables: PropTypes.shape({
            name: PropTypes.object,
            description: PropTypes.object,
            startDate: PropTypes.object,
            type: PropTypes.object,
        }),
    };

    Confirm.defaultProps = {
        variables: {},
    };

    const { handleSubmit } = props;
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Hidden smDown>
                <Grid item md={1} className={classes.iconGrid}>
                    <PlaylistAddCheck className={classes.icon} />
                </Grid>
            </Hidden>
            <Grid item xs={12} md={9} className={classes.noPaddingLeft}>
                <TitledPaper title={t('createEvent.confirm.title')}>
                    <Typography variant="body1">{t('createEvent.confirm.description')}</Typography>
                    <Grid container justify="space-around" className={classes.eventItems}>
                        <Hidden smDown>
                            <EventItem
                                key={0}
                                id={event.id}
                                name={event.name}
                                description={event.description}
                                date={event.startDate}
                                image={event.image}
                                type={event.type}
                                style={{ opacity: 0.5, filter: 'blur(1px)' }}
                                hoverZoom={false}
                            />
                        </Hidden>
                        <EventItem
                            key={1}
                            id="1"
                            name={props.variables.name?.value ? props.variables.name.value : event.name}
                            description={
                                props.variables.description?.value
                                    ? props.variables.description.value
                                    : event.description
                            }
                            date={props.variables.startDate?.value ? props.variables.startDate.value : event.startDate}
                            image="https://miro.medium.com/max/1400/0*RE_lW738kmA3SuW2.png"
                            type={props.variables.type?.value ? props.variables.type.value : event.type}
                            style={{ transform: 'scale(1.3)' }}
                        />
                        <Hidden smDown>
                            <EventItem
                                key={2}
                                id={event.id}
                                name={event.name}
                                description={event.description}
                                date={event.startDate}
                                image={event.image}
                                type={event.type}
                                style={{ opacity: 0.5, filter: 'blur(1px)' }}
                                hoverZoom={false}
                            />
                        </Hidden>
                    </Grid>
                    <Grid container justify="space-between" className={classes.submit}>
                        <Button
                            variant="outlined"
                            className={classes.lowerButton}
                            color="primary"
                            onClick={props.handleBackStep}
                        >
                            {t('back')}
                        </Button>
                        <Button
                            variant="contained"
                            className={`${classes.lowerButton} ${classes.special}`}
                            color="primary"
                            onClick={handleSubmit}
                        >
                            {t('submit')}
                        </Button>
                    </Grid>
                </TitledPaper>
            </Grid>
        </Grid>
    );
};

export default Confirm;
