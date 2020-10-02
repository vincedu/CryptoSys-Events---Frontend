import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        padding: '16px',
    },
    header: {
        paddingBottom: '16px',
    },
    content: {},
});

const TitledPaper = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h4">{props.title}</Typography>
            </div>
            <div className={classes.content}>{props.children}</div>
        </Paper>
    );
};

TitledPaper.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default TitledPaper;
