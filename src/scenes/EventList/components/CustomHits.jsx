import React from 'react';
import { Typography, makeStyles, Card, CardMedia, CardContent, CardHeader, Popper, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
    },
    popper: {
        padding: 10,
        backgroundColor: 'white',
        boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)`,
        margin: 0,
        width: '100%',
        borderRadius: 3,
        marginTop: -4,
    },
}));

const CustomHits = (props) => {
    CustomHits.propTypes = {
        history: PropTypes.object.isRequired,
        searchBarRef: PropTypes.object.isRequired,
        currentRefinement: PropTypes.string.isRequired,
        hits: PropTypes.array.isRequired,
    };

    const classes = useStyles();
    const { t } = useTranslation();
    const { history, searchBarRef, currentRefinement, hits } = props;

    const CustomSearchHits = () => (
        <div>
            {currentRefinement ? (
                <Popper
                    open
                    anchorEl={searchBarRef.current}
                    placement="bottom-end"
                    style={{ width: searchBarRef.current.offsetWidth, maxHeight: 0 }}
                >
                    <Grid container spacing={1} className={classes.popper}>
                        {hits.length ? (
                            hits.map((hit) => (
                                <Grid item xs={12} key={hit.objectID}>
                                    <Card
                                        className={classes.root}
                                        onClick={() =>
                                            history.push({
                                                pathname: `/event/${hit.objectID}`,
                                                state: { id: hit.objectID },
                                            })
                                        }
                                    >
                                        <Grid container direction="row">
                                            <Grid item xs={12} sm={6}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={hit.image}
                                                    title={hit.name}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
                                                <CardHeader titleTypographyProps={{ variant: 'h6' }} title={hit.name} />
                                                <CardContent>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                        maxLength={10}
                                                    >
                                                        {hit.description.length < 50
                                                            ? hit.description
                                                            : `${hit.description.substring(0, 50)}...`}
                                                    </Typography>
                                                </CardContent>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1">{t('eventList.noEvent')}</Typography>
                        )}
                    </Grid>
                </Popper>
            ) : null}
        </div>
    );

    return <CustomSearchHits />;
};
export default withRouter(CustomHits);
