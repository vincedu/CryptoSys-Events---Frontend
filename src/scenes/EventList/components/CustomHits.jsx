import React from 'react';
import { Typography, makeStyles, Popper, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CustomEventItem from '../../SearchPage/components/CustomEventItem';

const useStyles = makeStyles(() => ({
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
        marginTop: -5,
    },
}));

const CustomHits = (props) => {
    CustomHits.propTypes = {
        searchBarRef: PropTypes.object.isRequired,
        hits: PropTypes.array.isRequired,
    };

    const classes = useStyles();
    const { t } = useTranslation();
    const { searchBarRef, hits } = props;

    const CustomSearchHits = () => (
        <div>
            {hits.length ? (
                <Popper
                    open
                    anchorEl={searchBarRef.current}
                    placement="bottom-end"
                    style={{ width: searchBarRef.current.offsetWidth, maxHeight: 0 }}
                >
                    <Grid container spacing={1} className={classes.popper}>
                        {hits.length ? (
                            hits.map((hit) => (
                                <CustomEventItem
                                    key={hit.objectID}
                                    id={hit.objectID}
                                    name={hit.name}
                                    description={hit.description}
                                    image={hit.image}
                                    date={hit.date ? new Date(hit.date).toISOString() : ''}
                                    type={hit.type}
                                    tags={hit.tags}
                                    languages={hit.languages}
                                />
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
export default CustomHits;
