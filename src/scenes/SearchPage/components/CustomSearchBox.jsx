import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, InputBase, IconButton, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    input: {
        marginLeft: theme.spacing(2),
    },
    searchBar: {
        marginBottom: 40,
        maxWidth: 400,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '2px',
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
    },
}));

const CustomSearchBox = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const location = useLocation();

    const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
        return (
            <Paper className={classes.searchBar}>
                <InputBase
                    type="search"
                    className={classes.input}
                    placeholder={t('mainPageHeader.search')}
                    onChange={(event) => {
                        refine(event.currentTarget.value);
                    }}
                    value={currentRefinement}
                    style={{ flex: 4 }}
                />
                <IconButton color="primary" className={classes.iconButton}>
                    <Search className={classes.iconButton} />
                </IconButton>
            </Paper>
        );
    });

    return <SearchBox defaultRefinement={location.state?.search ? location.state.search : ''} />;
};

CustomSearchBox.propTypes = {};

export default CustomSearchBox;
