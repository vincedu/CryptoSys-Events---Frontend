import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    img: {
        maxWidth: '100%',
        minHeight: '100%',
        display: 'block',
    },
    event: {
        height: '100%',
    },
});

export default function EventItem(props) {
    const classes = useStyles();

    EventItem.propTypes = {
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.event}>
                <CardActionArea>
                    <Grid container spacing={3} direction="row" justify="flex-start">
                        <Grid item xs={12} sm={12} md={6}>
                            <img className={classes.img} src={props.image} alt="Event" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.description}
                                </Typography>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                            </CardContent>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
