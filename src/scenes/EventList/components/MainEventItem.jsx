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

const useStyles = makeStyles((theme) => ({
    media: {
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            height: 0,
            paddingTop: '56.25%',
        },
    },
}));

export default function MainEventItem(props) {
    const classes = useStyles();

    // TODO Fix some props type
    MainEventItem.propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    };

    return (
        <Grid item sm={12} md={8}>
            <Card className={classes.root}>
                {/* TODO Fix link to specific event */}
                <CardActionArea component={RouterLink} to={`/event/${props.id}`}>
                    <Grid container direction="row">
                        <Grid item xs={12} sm={6}>
                            <CardMedia className={classes.media} image={props.image} title={props.name} />
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                titleTypographyProps={{ variant: 'h4' }}
                                title={props.name}
                                subheader={props.date}
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
                </CardActionArea>
            </Card>
        </Grid>
    );
}
