import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/fr';
import { useMutation } from '@apollo/client';
import { LIKE_EVENT_MUTATION, UNLIKE_EVENT_MUTATION } from '@graphql/mutations';
import {
    makeStyles,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    IconButton,
    Chip,
    Tooltip,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Favorite, FavoriteBorder, Translate } from '@material-ui/icons';
import { AuthContext } from '@providers';

const EventItem = (props) => {
    const confirmPageStyle = props.confirmPage ? { transform: 'scale(1.3)', maxWidth: '32%', flexBasis: '32%' } : {};
    const useStyles = makeStyles((theme) => ({
        root: {
            ...props.style,
            position: 'relative',
            [theme.breakpoints.up('md')]: confirmPageStyle,
            zIndex: 0,
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
    }));
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const { userData, setUserData, isUserDataConfigured } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(userData?.liked?.includes(props.id));

    const handleButtonClick = () => {
        history.push({
            pathname: `/event/${props.id}`,
            state: {
                id: props.id,
            },
        });
    };

    const [likeEvent] = useMutation(LIKE_EVENT_MUTATION);
    const [unlikeEvent] = useMutation(UNLIKE_EVENT_MUTATION);

    const handleLike = async (event) => {
        event.stopPropagation();
        if (isUserDataConfigured) {
            if (isLiked) {
                unlikeEvent({ variables: { input: { id: props.id } } }).then(setIsLiked(false));
                setUserData({ ...userData, liked: userData.liked.filter((id) => id !== props.id) });
            } else {
                likeEvent({ variables: { input: { id: props.id } } }).then(setIsLiked(true));
                const updatedLiked = [...userData.liked, props.id];
                setUserData({ ...userData, liked: updatedLiked });
            }
            props.onLike();
        }
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.root}>
            <Card onClick={props.clickeable ? handleButtonClick : () => {}} className={classes.card}>
                <CardMedia className={classes.media} image={props.image} title={props.name} />
                <CardHeader
                    title={props.name}
                    subheader={moment(props.date).locale(t('language')).format('MMM Do, h:mm a')}
                    style={{ paddingBottom: 0 }}
                />
                <CardContent style={{ paddingTop: 5, paddingBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                            {props.tags?.length &&
                                props.tags
                                    .slice(0, 2)
                                    .map((tag) => (
                                        <Chip
                                            key={tag}
                                            style={{ fontSize: '0.8em', height: 28, marginRight: 5 }}
                                            label={`#${tag}`}
                                            variant="outlined"
                                            color="primary"
                                        />
                                    ))}
                        </div>
                        {isUserDataConfigured && (
                            <IconButton onClick={props.clickeable && handleLike} style={{ marginRight: -5 }}>
                                <Tooltip title={isLiked ? t('liked.unlike') : t('liked.like')}>
                                    {isLiked ? <Favorite /> : <FavoriteBorder color="disabled" />}
                                </Tooltip>
                            </IconButton>
                        )}
                    </div>
                    <Typography variant="body2" color="textSecondary">
                        {props.description.length < 100
                            ? props.description
                            : `${props.description.substring(0, 100)}...`}
                    </Typography>
                    {props.languages?.length && (
                        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 10 }}>
                            <Translate style={{ fontSize: '1rem', padding: '0 5px', color: 'rgba(0, 0, 0, 0.54)' }} />
                            <Typography variant="body2" color="textSecondary">
                                {props.languages.map((language) => t(language)).join(', ')}
                            </Typography>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
};

EventItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    hoverZoom: PropTypes.bool,
    clickeable: PropTypes.bool,
    style: PropTypes.object,
    confirmPage: PropTypes.bool,
    onLike: PropTypes.func,
};

EventItem.defaultProps = {
    hoverZoom: true,
    style: {},
    clickeable: true,
    confirmPage: false,
    onLike: () => {},
};

export default EventItem;
