import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, makeStyles, Fab } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import CustomHits from './components/CustomHits';
import CustomRefinementList from './components/CustomRefinementList';
import CustomPagination from './components/CustomPagination';
import CustomSearchBox from './components/CustomSearchBox';
import CustomDate from './components/CustomDate';
import CustomGeoSearch from './components/CustomGeoSearch';

const searchClient = algoliasearch('VCNEJZ733V', '706e46ab8ab63bef46ae91d9626b520a');

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.secondary.main,
        fontFamily: `'Bebas Neue', sans-serif`,
    },
    right: {
        padding: '0 0 0.5rem 1rem',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    open: {
        width: '50% !important',
    },
    maps: {
        transition: 'width 1s',
        width: '0',
    },
}));

const SearchPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [open, setOpen] = useState(window.innerWidth > 960);

    return (
        <InstantSearch searchClient={searchClient} indexName="events">
            <Configure filters={`date > ${+new Date()}`} />
            <Grid container justify={window.innerWidth > 600 ? 'flex-start' : 'center'} style={{ paddingLeft: '1rem' }}>
                <Grid item xs={11} sm={3} md={2} style={{ width: '100%', padding: 5 }}>
                    <CustomDate attribute="date" />
                    <CustomRefinementList attribute="category" numberItems={5} />
                    <CustomRefinementList attribute="type" numberItems={5} />
                    <CustomRefinementList attribute="tags" numberItems={2} />
                    <CustomRefinementList attribute="languages" numberItems={2} />
                </Grid>
                <Grid item xs={12} sm={9} md={10} className={classes.right}>
                    <div style={{ flex: 1, display: 'flex' }}>
                        <div style={{ padding: '2rem 2rem 0', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0 30px 30px' }}>
                                <Typography className={classes.title} variant="h2">
                                    {t('searchPage.customSearch')}
                                </Typography>
                                <Fab variant="extended" color="primary" onClick={() => setOpen(!open)}>
                                    <MapIcon style={{ marginRight: 5 }} />
                                    {open ? t('searchPage.closeMap') : t('searchPage.openMap')}
                                </Fab>
                            </div>
                            <CustomSearchBox />
                            <CustomHits />
                            <CustomPagination />
                        </div>
                        <div className={`${classes.maps} ${open ? classes.open : ''}`}>
                            <CustomGeoSearch open={open} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </InstantSearch>
    );
};

SearchPage.propTypes = {};

export default SearchPage;
