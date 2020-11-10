import React from 'react';
import { makeStyles, InputBase, IconButton, Paper } from '@material-ui/core';
import { InstantSearch, connectAutoComplete } from 'react-instantsearch-dom';
import { Search } from '@material-ui/icons';
import algoliasearch from 'algoliasearch/lite';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CustomHits from './CustomHits';

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
    input: {
        marginLeft: theme.spacing(1),
    },
    searchBar: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'none',
    },
}));

const searchClient = algoliasearch('VCNEJZ733V', '34110b7a7dda814d41a2851e341a2f6b');

const Autocomplete = (props) => {
    Autocomplete.propTypes = {
        searchBarRef: PropTypes.object.isRequired,
    };

    const classes = useStyles();

    const { t } = useTranslation();
    const { searchBarRef } = props;

    const CustomSearchBox = connectAutoComplete(({ refine, hits, currentRefinement }) => (
        <Paper className={classes.searchBar}>
            <InputBase
                type="search"
                className={classes.input}
                placeholder={t('customSearchBar.search')}
                onChange={(event) => {
                    refine(event.currentTarget.value);
                }}
                value={currentRefinement}
                style={{ flex: 4 }}
            />
            <IconButton color="primary" className={classes.iconButton}>
                <Search className={classes.iconButton} />
            </IconButton>
            <CustomHits searchBarRef={searchBarRef} hits={hits} currentRefinement={currentRefinement} />
        </Paper>
    ));

    return (
        <div>
            <InstantSearch searchClient={searchClient} indexName="events">
                <CustomSearchBox />
            </InstantSearch>
        </div>
    );
};
export default Autocomplete;
