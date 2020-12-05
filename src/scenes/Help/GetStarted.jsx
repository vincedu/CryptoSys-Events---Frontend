import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { PageContainer } from '@components';

const useStyles = makeStyles((theme) => ({
    '@keyframes float': {
        '0%': {
            transform: 'translatey(0px)',
        },
        '50%': {
            transform: 'translatey(-5px)',
        },
        '100%': {
            transform: 'translatey(0px)',
        },
    },
    img: {
        width: '100%',
        objectFit: 'contain',
        animation: '$float 6s ease-in-out infinite',
    },
    caracteristic: {
        padding: 30,
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            padding: '20px!important',
            justifyContent: 'center',
        },
    },
    categoryTitle: {
        fontFamily: `'Bebas Neue', sans-serif`,
    },
}));

const GetStarted = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <PageContainer>
            <Grid container justify="center">
                <Grid item xs={11} sm={10} md={9}>
                    <Grid container alignItems="center" justify="center" spacing={2}>
                        <Grid item xs={12} style={{ padding: 20 }}>
                            <Typography className={classes.categoryTitle} variant="h1" color="secondary">
                                {t('getStarted.title')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6}>
                            <div className={classes.ticketText}>
                                <Typography color="primary" variant="h4">
                                    {t('getStarted.waxTitle')}
                                </Typography>
                                <br />
                                <Typography color="primary" variant="body1">
                                    {t('getStarted.waxDescription1')}
                                    <a href="https://waxsweden.org/create-testnet-account/">
                                        https://waxsweden.org/create-account
                                    </a>
                                </Typography>
                                <Typography color="primary" variant="body1">
                                    {t('getStarted.waxDescription2')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <img src="wax_logo.png" alt="eos" className={classes.img} />
                        </Grid>
                        <Grid item xs={10} sm={5}>
                            <img src="anchor_logo.png" alt="ticket" className={classes.img} />
                        </Grid>
                        <Grid item xs={12} sm={7} md={6}>
                            <div className={classes.ticketText}>
                                <Typography color="primary" variant="h4">
                                    {t('getStarted.anchorTitle')}
                                </Typography>
                                <br />
                                <Typography color="primary" variant="subtitle1">
                                    {t('getStarted.anchorDescription1')}
                                    <a href="https://greymass.com/en/anchor/">https://greymass.com/en/anchor/.</a>
                                </Typography>
                                <Typography color="primary" variant="subtitle1">
                                    {t('getStarted.anchorDescription2')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6}>
                            <div className={classes.ticketText}>
                                <Typography color="primary" variant="h4">
                                    {t('getStarted.spectacularTitle')}
                                </Typography>
                                <br />
                                <Typography color="primary" variant="body1">
                                    {t('getStarted.spectacularDescription')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div>
                                <img src="spectacularblue.svg" alt="eos" className={classes.img} />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

GetStarted.propTypes = {};

export default GetStarted;
