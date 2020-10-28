import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '16px',
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },
    header: {
        paddingBottom: '16px',
    },
    content: {},
    title: {
        fontStyle: `'Roboto', sans-serif`,
        fontWeight: 900,
        color: '#242424',
        [theme.breakpoints.down('xs')]: {
            fontSize: '2em',
        },
    },
}));

const TitledPaper = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.title} variant="h3">
                    {props.title}
                </Typography>
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
