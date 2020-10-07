import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

export default function EventItem(props) {
    const classes = useStyles();

    // TODO Fix some props type
    EventItem.propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.root}>
                {/* TODO Fix link to specific event */}
                <CardActionArea component={RouterLink} to={`/event/${props.id}`}>
                    <CardMedia className={classes.media} image={props.image} title={props.name} />
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={props.name}
                        subheader={props.date}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" maxLength={10}>
                            {props.description.length < 100
                                ? props.description
                                : `${props.description.substring(0, 100)}...`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
