import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Card, Typography, CardContent, CardMedia, CardHeader } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    media: {
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            height: 0,
            paddingTop: '56.25%',
        },
    },
    root: {
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.01)',
        },
        borderRadius: '2px',
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
    },
    categoryTitle: {
        padding: '0px 20px 20px 20px',
        textAlign: 'left',
        color: theme.palette.secondary.main,
        fontFamily: `'Bebas Neue', sans-serif`,
    },
    horizontalLine: {
        margin: '80px 30px 30px 30px',
        border: 0,
        height: 1,
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(214, 108, 68, 0.75), rgba(0, 0, 0, 0))',
    },
}));

const MainEventItem = (props) => {
    const classes = useStyles();

    // TODO Fix some props type
    MainEventItem.propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
    };

    const { history } = props;

    // TODO change pathname to something else than ID?
    const handleButtonClick = (pageURL) => {
        history.push({
            pathname: pageURL,
            state: {
                id: props.id,
            },
        });
    };

    return (
        <div>
            <Typography className={classes.categoryTitle} variant="h3">
                Main Event
            </Typography>
            <Grid item sm={12} md={8}>
                <Card className={classes.root} onClick={() => handleButtonClick(`/event/${props.id}`)}>
                    <Grid container direction="row">
                        <Grid item xs={12} sm={6}>
                            <CardMedia className={classes.media} image={props.image} title={props.name} />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
                            <CardHeader
                                titleTypographyProps={{ variant: 'h4' }}
                                title={props.name}
                                subheader={props.date.substring(0, 10)}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p" maxLength={10}>
                                    {props.description.length < 100
                                        ? props.description
                                        : `${props.description.substring(0, 200)}...`}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <hr className={classes.horizontalLine} />
        </div>
    );
};
export default withRouter(MainEventItem);
