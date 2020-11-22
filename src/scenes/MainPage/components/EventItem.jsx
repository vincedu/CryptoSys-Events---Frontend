import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
    Paper,
    IconButton,
    Chip,
    Tooltip,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Favorite, FavoriteBorder, Translate } from '@material-ui/icons';

const EventItem = (props) => {
    EventItem.propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
        languages: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired,
        withBanner: PropTypes.bool,
        hoverZoom: PropTypes.bool,
        clickeable: PropTypes.bool,
        style: PropTypes.object,
        confirmPage: PropTypes.bool,
        liked: PropTypes.bool,
    };
    EventItem.defaultProps = {
        withBanner: false,
        hoverZoom: true,
        style: {},
        clickeable: true,
        confirmPage: false,
        liked: false,
    };
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
        banner: {
            minWidth: 40,
            height: 35,
            borderRadius: 2,
            position: 'absolute',
            top: 30,
            right: 0,
            boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
            zIndex: 1,
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
    const { t } = useTranslation();
    const { history, liked } = props;
    const [isLiked, setIsLiked] = useState(liked);

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
        if (isLiked) {
            unlikeEvent({ variables: { input: { id: props.id } } }).then(setIsLiked(false));
        } else {
            likeEvent({ variables: { input: { id: props.id } } }).then(setIsLiked(true));
        }
    };
    return (
        <Grid item xs={12} sm={6} md={3} className={classes.root}>
            {props.withBanner || props.tags?.includes('free') ? (
                <div className={classes.banner}>
                    <Paper className={classes.bannerContent}>
                        <p style={{ margin: 'auto' }}>{t('eventList.free')}</p>
                    </Paper>
                </div>
            ) : null}
            <Card onClick={props.clickeable ? handleButtonClick : null} className={classes.card}>
                <CardMedia className={classes.media} image={props.image} title={props.name} />
                <CardHeader title={props.name} subheader={props.date.substring(0, 10)} style={{ paddingBottom: 0 }} />
                <CardContent style={{ paddingTop: 5, paddingBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
                            {props.tags?.length
                                ? props.tags
                                      .slice(0, 2)
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
                            <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
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
                            <Translate style={{ fontSize: '1rem', padding: '0 5px', color: 'rgba(0, 0, 0, 0.54)' }} />
                            <Typography variant="body2" color="textSecondary">
                                {props.languages.map((language) => t(language)).join(', ')}
                            </Typography>
                        </div>
                    ) : null}
                </CardContent>
            </Card>
        </Grid>
    );
};

export default withRouter(EventItem);
