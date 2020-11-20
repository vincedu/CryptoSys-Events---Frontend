import React from 'react';
import { makeStyles, InputBase, IconButton, Paper, Popper, Grid, Typography, fade } from '@material-ui/core';
import { InstantSearch, connectAutoComplete } from 'react-instantsearch-dom';
import { Search } from '@material-ui/icons';
import algoliasearch from 'algoliasearch/lite';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomEventItem from '../../SearchPage/components/CustomEventItem';

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

const Autocomplete = (props) => {
    Autocomplete.propTypes = {
        searchBarRef: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        navbar: PropTypes.bool,
    };

    Autocomplete.defaultProps = {
        navbar: false,
    };

    const useStyles = makeStyles((theme) => ({
        input: {
            marginLeft: theme.spacing(1),
        },
        searchBar: {
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'none',
            height: 40,
        },
        popper: {
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
        root: {
            backgroundColor: fade(theme.palette.common.white, 0.9),
            '&:hover': {
                backgroundColor: '#FFF',
            },
        },
    }));

    const classes = useStyles();

    const { t } = useTranslation();
    const { searchBarRef, history } = props;

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
                <Paper className={classes.searchBar} {...(props.navbar && { classes: { root: classes.root } })}>
                    <InputBase
                        type="search"
                        margin="dense"
                        className={classes.input}
                        placeholder={t('customSearchBar.search')}
                        onChange={(event) => {
                            refine(event.currentTarget.value);
                        }}
                        value={currentRefinement}
                        style={{ flex: 4 }}
                        onKeyDown={checkEnterKey}
                    />
                    <IconButton color="primary" className={classes.iconButton} onClick={handleSearch}>
                        <Search className={classes.iconButton} />
                    </IconButton>
                </Paper>
                {hits.length && currentRefinement ? (
                    <Popper
                        open
                        anchorEl={searchBarRef.current}
                        placement="bottom"
                        style={{ width: searchBarRef.current.offsetWidth, minWidth: 500, maxHeight: 0 }}
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
                                <Typography variant="body1">{t('eventList.noEvent')}</Typography>
                            )}
                        </Grid>
                    </Popper>
                ) : null}
            </>
        );
    });

    return (
        <div>
            <InstantSearch searchClient={searchClient} indexName="events">
                <CustomAutocomplete />
            </InstantSearch>
        </div>
    );
};
export default withRouter(Autocomplete);
