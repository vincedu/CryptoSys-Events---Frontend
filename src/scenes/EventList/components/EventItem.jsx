import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardHeader, CardMedia, CardContent, Typography, Grid, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const EventItem = (props) => {
    EventItem.propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
        withBanner: PropTypes.bool,
        hoverZoom: PropTypes.bool,
        clickeable: PropTypes.bool,
        style: PropTypes.object,
        confirmPage: PropTypes.bool,
    };
    EventItem.defaultProps = {
        withBanner: false,
        hoverZoom: true,
        style: {},
        clickeable: true,
        confirmPage: false,
    };
    const confirmPageStyle = props.confirmPage ? { transform: 'scale(1.3)', maxWidth: '32%', flexBasis: '32%' } : {};
    const useStyles = makeStyles((theme) => ({
        root: {
            ...props.style,
            position: 'relative',
            [theme.breakpoints.up('md')]: confirmPageStyle,
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        card: {
            transition: 'transform .2s',
            borderRadius: '2px',
            boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
            '&:hover': props.hoverZoom ? { transform: 'scale(1.01)', cursor: 'pointer' } : {},
        },
        banner: {
            minWidth: 40,
            height: 35,
            borderRadius: 2,
            position: 'absolute',
            top: 30,
            right: 0,
            zIndex: 1,
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
    const classes = useStyles();

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
        <Grid item xs={12} sm={6} md={3} className={classes.root}>
            {props.withBanner ? (
                <div className={classes.banner}>
                    <Paper className={classes.bannerContent}>
                        <p style={{ margin: 'auto' }}>{props.type}</p>
                    </Paper>
                </div>
            ) : null}
            <Card onClick={props.clickeable ? handleButtonClick : null} className={classes.card}>
                <CardMedia className={classes.media} image={props.image} title={props.name} />
                <CardHeader title={props.name} subheader={props.date.substring(0, 10)} />
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
