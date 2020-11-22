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

    media: {
        height: 0,
        paddingTop: '56.25%',
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
    promotion: {
        paddingBottom: 40,
        background: 'linear-gradient(70deg, rgba(50,72,86,1) 0%, rgba(99,140,166,1) 100%)',
        boxSizing: 'border-box!important',
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
    },
    categoryTitle: {
        fontFamily: `'Bebas Neue', sans-serif`,
    },
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    backgroundBlue: {
        position: 'absolute',
        background: 'linear-gradient(190deg, #324856 50%, transparent 25%)',
        height: '100vh',
        width: '100%',
        animation: '$float 5s ease-in-out infinite',
    },
    backgroundOrange: {
        position: 'absolute',
        background: 'linear-gradient(170deg, #d66c44 50%, transparent 25%)',
        height: '95vh',
        width: '100%',
        animation: '$float 6s ease-in-out infinite',
    },
}));

export default function HelpCenter() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <PageContainer>
            <Grid container justify="center">
                <Grid item xs={11} sm={10} md={9}>
                    <Grid container alignItems="center" justify="center" spacing={2}>
                        <Grid item xs={12} style={{ padding: 20 }}>
                            <Typography className={classes.categoryTitle} variant="h1" color="secondary">
                                {t('helpCenter.title')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6}>
                            <div className={classes.ticketText}>
                                <Typography color="primary" variant="h4">
                                    {t('helpCenter.why')}
                                </Typography>
                                <br />
                                <Typography color="primary" variant="body1">
                                    {t('helpCenter.whyDesc')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <img src="eosHelp.png" alt="eos" className={classes.img} />
                        </Grid>
                        <Grid item xs={10} sm={5}>
                            <img src="ticket.png" alt="ticket" className={classes.img} />
                        </Grid>
                        <Grid item xs={12} sm={7} md={6}>
                            <div className={classes.ticketText}>
                                <Typography color="primary" variant="h4">
                                    {t('helpCenter.nft')}
                                </Typography>
                                <br />
                                <Typography color="primary" variant="subtitle1">
                                    {t('helpCenter.nftDesc')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={10} sm={4} md={3}>
                            <Grid container className={classes.caracteristic}>
                                <Grid item xs={7} sm={11}>
                                    <img src="safe.png" alt="safe" className={classes.img} />
                                </Grid>
                                <Grid item xs={8} sm={12}>
                                    <Typography variant="h4">{t('helpCenter.safe')}</Typography>
                                    <Typography variant="subtitle1">{t('helpCenter.safeDesc')}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={10} sm={4} md={3}>
                            <Grid container className={classes.caracteristic}>
                                <Grid item xs={8} sm={12}>
                                    <img src="fast.png" alt="safe" className={classes.img} />
                                </Grid>
                                <Grid item xs={8} sm={12}>
                                    <Typography variant="h4">{t('helpCenter.fast')}</Typography>
                                    <Typography variant="body1">{t('helpCenter.fastDesc')}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={10} sm={4} md={3}>
                            <Grid container className={classes.caracteristic}>
                                <Grid item xs={8} sm={12}>
                                    <img src="eosHelp.png" alt="safe" className={classes.img} />
                                </Grid>
                                <Grid item xs={8} sm={12}>
                                    <Typography variant="h4">{t('helpCenter.eos')}</Typography>
                                    <Typography variant="body1">{t('helpCenter.eosDesc')}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    );
}
