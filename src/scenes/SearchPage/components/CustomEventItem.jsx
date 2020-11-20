import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Card, Typography, CardContent, CardMedia, CardHeader, Chip } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Translate } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

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
    fake: {
        opacity: 0.5,
        filter: 'blur(1px)',
    },
}));

const CustomEventItem = (props) => {
    const classes = useStyles();

    const { history } = props;
    const { t } = useTranslation();

    const handleButtonClick = (pageURL) => {
        history.push({
            pathname: pageURL,
            state: {
                id: props.id,
            },
        });
    };

    return (
        <Grid item sm={12} className={props.fake ? classes.fake : null}>
            <Card className={classes.root} onClick={() => handleButtonClick(`/event/${props.id}`)}>
                <Grid container direction="row">
                    <Grid item xs={12} sm={5}>
                        <CardMedia className={classes.media} image={props.image} title={props.name} />
                    </Grid>
                    <Grid item xs={12} sm={7} style={{ margin: 'auto' }}>
                        <CardHeader
                            titleTypographyProps={{ variant: 'h4' }}
                            title={props.name}
                            subheader={props.date.substring(0, 10)}
                            style={{ paddingBottom: 0 }}
                        />
                        <CardContent style={{ paddingTop: 5, paddingBottom: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    {props.tags?.length
                                        ? props.tags.slice(0, 3).map((tag) => (
                                              <Chip
                                                  key={tag}
                                                  style={{
                                                      fontSize: '0.8em',
                                                      height: 28,
                                                      margin: '5px 5px 10px 0',
                                                  }}
                                                  label={`#${tag}`}
                                                  variant="outlined"
                                                  color="primary"
                                              />
                                          ))
                                        : null}
                                </div>
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

CustomEventItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    fake: PropTypes.bool,
};

CustomEventItem.defaultProps = {
    fake: false,
};

export default withRouter(CustomEventItem);
