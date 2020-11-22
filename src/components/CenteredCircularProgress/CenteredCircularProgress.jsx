import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
});

const CenteredCircularProgress = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <CircularProgress {...props} />
        </div>
    );
};

CenteredCircularProgress.propTypes = {};

export default CenteredCircularProgress;
