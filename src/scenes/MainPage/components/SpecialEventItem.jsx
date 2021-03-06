import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import {
    makeStyles,
    Grid,
    Card,
    Typography,
    CardContent,
    CardMedia,
    CardHeader,
    Chip,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import { LIKE_EVENT_MUTATION, UNLIKE_EVENT_MUTATION } from '@graphql/mutations';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Favorite, FavoriteBorder, Translate } from '@material-ui/icons';

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
        height: '100%',
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

const SpecialEventItem = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const handleButtonClick = (pageURL) => {
        history.push({
            pathname: pageURL,
            state: {
                id: props.id,
            },
        });
    };
    const [isLiked, setIsLiked] = useState(props.liked);
    const [likeEvent] = useMutation(LIKE_EVENT_MUTATION);
    const [unlikeEvent] = useMutation(UNLIKE_EVENT_MUTATION);

    const handleLike = async (event) => {
        event.stopPropagation();
        if (isLiked) {
            unlikeEvent({ variables: { input: { id: props.id } } }).then(setIsLiked(false));
        } else {
            likeEvent({ variables: { input: { id: props.id } } }).then(setIsLiked(true));
        }
    };

    return (
        <Grid item sm={12} md={6} style={{ width: '100%' }}>
            <Card className={classes.root} onClick={() => handleButtonClick(`/event/${props.id}`)}>
                <Grid container style={{ height: '100%' }}>
                    <Grid item xs={12} sm={6}>
                        <CardMedia className={classes.media} image={props.image} title={props.name} />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
                        <CardHeader
                            title={props.name}
                            subheader={moment(props.date).locale(t('language')).format('MMM Do, h:mm a')}
                            style={{ paddingBottom: 0 }}
                        />
                        <CardContent style={{ paddingTop: 5, paddingBottom: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    {props.tags?.length
                                        ? props.tags
                                              .slice(0, 3)
                                              .map((tag) => (
                                                  <Chip
                                                      key={tag}
                                                      style={{ fontSize: '0.8em', height: 28, marginRight: 5 }}
                                                      label={`#${tag}`}
                                                      variant="outlined"
                                                      color="primary"
                                                  />
                                              ))
                                        : null}
                                </div>
                                <IconButton onClick={handleLike} style={{ marginRight: -5 }}>
                                    <Tooltip title={isLiked ? t('liked.unlike') : t('liked.like')}>
                                        {isLiked ? <Favorite /> : <FavoriteBorder color="disabled" />}
                                    </Tooltip>
                                </IconButton>
                            </div>
                            <Typography variant="body2" color="textSecondary">
                                {props.description.length < 100
                                    ? props.description
                                    : `${props.description.substring(0, 100)}...`}
                            </Typography>
                            {props.languages?.length ? (
                                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 10 }}>
                                    <Translate
                                        style={{ fontSize: '1rem', padding: '0 5px', color: 'rgba(0, 0, 0, 0.54)' }}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        {props.languages.map((language) => t(language)).join(', ')}
                                    </Typography>
                                </div>
                            ) : null}
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

SpecialEventItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    liked: PropTypes.bool,
};
SpecialEventItem.defaultProps = {
    liked: false,
};

export default SpecialEventItem;
