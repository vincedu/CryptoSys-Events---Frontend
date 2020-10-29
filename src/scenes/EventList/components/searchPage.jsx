import React from 'react';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID_QUERY } from '@graphql/queries';
import { Button, makeStyles, Typography, CircularProgress, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    imageBackground: {
        backgroundImage: `url('https://eosnation.io/wp-content/uploads/2019/02/2018-07-26_19.16.59.jpg')`,
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '5%',
    },
    event: {
        padding: 20,
    },
    media: {
        display: 'block',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        maxWidth: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            height: 0,
            paddingTop: '56.25%',
        },
    },
}));

const SearchPage = (props) => {
    const { t } = useTranslation();
    SearchPage.propTypes = {
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
            state: PropTypes.shape({
                id: PropTypes.string.isRequired,
            }),
        }),
    };

    SearchPage.defaultProps = {
        location: {
            pathname: '',
            state: {
                id: '',
            },
        },
    };

    const classes = useStyles();

    // Query Item by ID
    const { data, loading } = useQuery(EVENT_BY_ID_QUERY, { variables: { id: props.location.state.id } });

    if (loading) {
        return <CircularProgress />;
    }

    if (data !== undefined) {
        return (
            <div style={{ padding: 20 }}>
                <Grid container direction="row" justify="center">
                    <Grid item xs={11} md={6} style={{ paddingRight: 25 }}>
                        <div style={{ height: '100%' }}>
                            <div
                                className={classes.media}
                                style={{ backgroundImage: `url('${data.eventById.image}'` }}
                                alt="Event"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={11} md={5}>
                        <Typography variant="h2">{data.eventById.name}</Typography>
                        <Typography variant="subtitle1">{data.eventById.startDate.substring(0, 10)}</Typography>
                        <br />
                        <Typography variant="subtitle1">{data.eventById.description}</Typography>
                        <Button variant="outlined" color="secondary" style={{ float: 'right', margin: 20 }}>
                            {t('eventPage.tickets')}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <div>
            {/* TODO Fix error page when event not found */}
            <Typography variant="h3">Error with event</Typography>
        </div>
    );
};

export default SearchPage;
