import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, makeStyles, Hidden } from '@material-ui/core';
import { TitledPaper } from '@components';
import { useTranslation } from 'react-i18next';
import { PlaylistAddCheck } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    submit: {
        paddingTop: 60,
    },
    lowerButton: {
        padding: 15,
    },
    special: {
        fontWeight: 900,
    },
}));

export const Confirm = (props) => {
    const { handleSubmit } = props;
    const { t } = useTranslation();
    const classes = useStyles();

    const { handleBackStep } = props;

    return (
        <Grid container justify="center">
            <Hidden smDown>
                <Grid item md={1} className={classes.iconGrid}>
                    <PlaylistAddCheck className={classes.icon} />
                </Grid>
            </Hidden>
            <Grid item xs={12} md={9} className={classes.noPaddingLeft}>
                <TitledPaper title={t('createEvent.confirm.title')}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="body1">{t('createEvent.confirm.description')}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container justify="space-between" className={classes.submit}>
                        <Button
                            variant="outlined"
                            className={classes.lowerButton}
                            color="primary"
                            onClick={handleBackStep}
                        >
                            {t('back')}
                        </Button>
                        <Button
                            variant="contained"
                            className={`${classes.lowerButton} ${classes.special}`}
                            color="primary"
                            onClick={handleSubmit}
                        >
                            {t('submit')}
                        </Button>
                    </Grid>
                </TitledPaper>
            </Grid>
        </Grid>
    );
};

Confirm.propTypes = {
    handleBackStep: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default Confirm;
