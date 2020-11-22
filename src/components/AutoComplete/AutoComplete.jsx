import React from 'react';
import {
    makeStyles,
    InputBase,
    IconButton,
    Paper,
    Popper,
    Grid,
    Typography,
    OutlinedInput,
    ClickAwayListener,
} from '@material-ui/core';
import { InstantSearch, Configure, connectAutoComplete } from 'react-instantsearch-dom';
import { Search } from '@material-ui/icons';
import algoliasearch from 'algoliasearch/lite';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomEventItem from '../../scenes/SearchPage/components/CustomEventItem';

const algoliaClient = algoliasearch('VCNEJZ733V', '34110b7a7dda814d41a2851e341a2f6b');
const searchClient = {
    search(requests) {
        // prevent search when empty query parameter
        if (requests.every(({ params }) => !params.query)) {
            return null;
        }
        return algoliaClient.search(requests);
    },
};

const useStyles = makeStyles((theme) => ({
    input: {
        marginLeft: theme.spacing(1),
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'none',
    },
    popper: {
        backgroundColor: 'white',
        boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)`,
        width: '100%',
        borderRadius: 3,
        marginTop: -5,
        padding: 10,
        justifyContent: 'center',
    },
    inputRoot: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
    },
    inputFocused: {
        backgroundColor: '#FFF',
        '&:hover': {
            backgroundColor: '#FFF',
        },
    },
    inputNotch: {
        border: '0 !important',
    },
}));

const Autocomplete = (props) => {
    const classes = useStyles();

    const { t } = useTranslation();
    const { searchBarRef } = props;
    const history = useHistory();

    const CustomAutocomplete = connectAutoComplete(({ refine, hits, currentRefinement }) => {
        const handleSearch = () => {
            if (currentRefinement) {
                history.push({
                    pathname: '/search',
                    state: {
                        search: currentRefinement,
                    },
                });
            }
        };
        const checkEnterKey = (key) => {
            if (key.keyCode === 13) handleSearch();
        };
        return (
            <>
                {props.navbar ? (
                    <OutlinedInput
                        type="search"
                        variant="outlined"
                        placeholder={t('mainPageHeader.search')}
                        margin="dense"
                        onKeyDown={checkEnterKey}
                        value={currentRefinement}
                        onChange={(event) => {
                            refine(event.currentTarget.value);
                        }}
                        endAdornment={
                            <IconButton color="primary" onClick={handleSearch} style={{ padding: 8 }}>
                                <Search style={{ width: '0.8em', height: '0.8em' }} />
                            </IconButton>
                        }
                        classes={{
                            root: classes.inputRoot,
                            focused: classes.inputFocused,
                            notchedOutline: classes.inputNotch,
                        }}
                    />
                ) : (
                    <Paper className={classes.searchBar}>
                        <InputBase
                            type="search"
                            margin="dense"
                            className={classes.input}
                            placeholder={t('mainPageHeader.search')}
                            onChange={(event) => {
                                refine(event.currentTarget.value);
                            }}
                            value={currentRefinement}
                            style={{ flex: 4 }}
                            onKeyDown={checkEnterKey}
                        />
                        <IconButton color="primary" onClick={handleSearch}>
                            <Search />
                        </IconButton>
                    </Paper>
                )}
                {currentRefinement ? (
                    <ClickAwayListener onClickAway={() => refine()}>
                        <Popper
                            open
                            anchorEl={searchBarRef.current}
                            placement="bottom"
                            style={{
                                width: Math.floor(searchBarRef.current.getBoundingClientRect().width),
                                minWidth: Math.min(window.innerWidth, 500),
                                maxHeight: 0,
                            }}
                            disablePortal={props.navbar}
                        >
                            <Grid container className={classes.popper}>
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
                                    <Typography variant="body1" color="primary">
                                        {t('eventList.noEvent')} &quot;{currentRefinement}&quot;
                                    </Typography>
                                )}
                            </Grid>
                        </Popper>
                    </ClickAwayListener>
                ) : null}
            </>
        );
    });

    return (
        <div>
            <InstantSearch searchClient={searchClient} indexName="events">
                <Configure filters={`date > ${+new Date()}`} hitsPerPage={3} />
                <CustomAutocomplete />
            </InstantSearch>
        </div>
    );
};

Autocomplete.propTypes = {
    searchBarRef: PropTypes.object.isRequired,
    navbar: PropTypes.bool,
};

Autocomplete.defaultProps = {
    navbar: false,
};

export default Autocomplete;
