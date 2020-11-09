import React from 'react';
import { Typography, makeStyles, Card, CardMedia, CardContent, CardHeader, Popper, Grid } from '@material-ui/core';
import { connectHits } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
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
    },
    popper: {
        padding: 10,
        backgroundColor: 'white',
        margin: 0,
        width: '100%',
        zIndex: 2,
    },
}));

const CustomHits = (props) => {
    CustomHits.propTypes = {
        history: PropTypes.object.isRequired,
        searchBarRef: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired,
    };

    const classes = useStyles();

    const { history, searchBarRef, open } = props;

    const CustomSearchHits = connectHits(({ hits }) => (
        <div>
            {open ? (
                <Popper
                    open={open}
                    anchorEl={searchBarRef.current}
                    placement="bottom-end"
                    style={{ width: searchBarRef.current.offsetWidth, maxHeight: 0, backgroundColor: 'white' }}
                >
                    <Grid container spacing={1} className={classes.popper}>
                        {hits.map((hit) => (
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
                                            <CardMedia className={classes.media} image={hit.image} title={hit.name} />
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
                        ))}
                    </Grid>
                </Popper>
            ) : null}
        </div>
    ));

    return <CustomSearchHits open={open} />;
};
export default withRouter(CustomHits);
