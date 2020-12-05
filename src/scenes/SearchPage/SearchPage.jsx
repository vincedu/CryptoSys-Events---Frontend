import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { ALGOLIASEARCH_CONFIG } from '@config/algoliasearch';
import CustomHits from './components/CustomHits';
import CustomRefinementList from './components/CustomRefinementList';
import CustomPagination from './components/CustomPagination';
import CustomSearchBox from './components/CustomSearchBox';
import CustomDate from './components/CustomDate';

const searchClient = algoliasearch(ALGOLIASEARCH_CONFIG.applicationId, ALGOLIASEARCH_CONFIG.apiKey);

const useStyles = makeStyles((theme) => ({
    title: {
        padding: '0 0 30px 30px',
        color: theme.palette.secondary.main,
        fontFamily: `'Bebas Neue', sans-serif`,
    },
    right: {
        padding: '2rem',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
}));

function SearchPage() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <InstantSearch searchClient={searchClient} indexName="events">
            <Configure filters={`date > ${+new Date()}`} />
            <Grid container justify={window.innerWidth > 600 ? 'flex-start' : 'center'} style={{ padding: '0 1rem' }}>
                <Grid item xs={11} sm={3} lg={2} style={{ width: '100%', padding: 5 }}>
                    <CustomDate attribute="date" />
                    <CustomRefinementList attribute="category" numberItems={5} />
                    <CustomRefinementList attribute="type" numberItems={5} />
                    <CustomRefinementList attribute="tags" numberItems={2} />
                    <CustomRefinementList attribute="languages" numberItems={2} />
                </Grid>
                <Grid item xs={12} sm={9} className={classes.right}>
                    <Typography className={classes.title} variant="h2">
                        {t('searchPage.customSearch')}
                    </Typography>
                    <CustomSearchBox />
                    <CustomHits />
                    <CustomPagination />
                </Grid>
            </Grid>
        </InstantSearch>
    );
}

export default SearchPage;
