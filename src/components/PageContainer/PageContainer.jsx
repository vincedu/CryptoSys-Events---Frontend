import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    title: {
        fontStyle: `'Roboto', sans-serif`,
        fontWeight: 900,
        color: '#242424',
        padding: '30px 30px 30px 60px',
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            fontSize: '3em',
        },
    },
}));

const PageContainer = (props) => {
    const { title, children } = props;
    const classes = useStyles();
    return (
        <Grid container justify="center" className={classes.container}>
            {title ? (
                <Grid item sm={12} md={9}>
                    <Typography className={classes.title} variant="h2">
                        {title}
                    </Typography>
                </Grid>
            ) : null}
            <Grid item md={12} lg={11}>
                {children}
            </Grid>
        </Grid>
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
