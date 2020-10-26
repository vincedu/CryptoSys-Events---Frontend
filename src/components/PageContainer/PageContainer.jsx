import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        flexGrow: 1,
    },
}));

const PageContainer = (props) => {
    const { title, children } = props;
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Grid container spacing={3} direction="column">
                {title ? (
                    <Grid item xs={12}>
                        <Typography variant="h3">{title}</Typography>
                    </Grid>
                ) : null}
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </div>
    );
};

PageContainer.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

PageContainer.defaultProps = {
    title: '',
};

export default PageContainer;
