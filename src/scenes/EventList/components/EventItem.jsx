import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardHeader, CardMedia, CardContent, Typography, Grid, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    root: {
        transition: 'transform .2s',
        borderRadius: '2px',
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
        '&:hover': {
            transform: 'scale(1.01)',
            cursor: 'pointer',
        },
    },
    banner: {
        minWidth: 40,
        height: 35,
        borderRadius: 2,
        position: 'absolute',
        top: 30,
        right: 0,
        zIndex: 3,
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
    },
    bannerContent: {
        backgroundColor: theme.palette.secondary.main,
        opacity: 0.95,
        textAlign: 'center',
        padding: 10,
        color: '#fff',
        fontWeight: 500,
    },
}));

const EventItem = (props) => {
    const classes = useStyles();

    // TODO Fix some props type
    EventItem.propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
    };

    const { history } = props;

    // TODO change pathname to something else than ID?
    const handleButtonClick = () => {
        history.push({
            pathname: `/event/${props.id}`,
            state: {
                id: props.id,
            },
        });
    };

    return (
        <Grid item xs={12} sm={6} md={3} style={{ position: 'relative' }}>
            <div className={classes.banner}>
                <Paper className={classes.bannerContent}>
                    <p style={{ margin: 'auto' }}>{props.type}</p>
                </Paper>
            </div>
            <Card onClick={handleButtonClick} className={classes.root}>
                <CardMedia className={classes.media} image={props.image} title={props.name} />
                <CardHeader title={props.name} subheader={props.date} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" maxLength={10}>
                        {props.description.length < 100
                            ? props.description
                            : `${props.description.substring(0, 100)}...`}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default withRouter(EventItem);
