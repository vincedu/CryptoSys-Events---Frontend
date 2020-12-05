import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Divider, Hidden } from '@material-ui/core';
import { PageContainer } from '@components';

const useStyles = makeStyles((theme) => ({
    '@keyframes float': {
        '0%': {
            transform: 'translatey(0px)',
        },
        '50%': {
            transform: 'translatey(-7px)',
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
    caracteristicImg: {
        width: '100%',
        paddingBottom: 15,
    },
    greyContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    greyImg: {
        width: '100%',
        transition: 'all 0.3s',
        filter: 'opacity(50%)',
        '&:hover': {
            filter: 'opacity(80%)',
            transform: 'scale(1.01)',
        },
    },
    categoryTitle: {
        fontFamily: `'Bebas Neue', sans-serif`,
    },
    caracteristicText: {
        color: '#4B5974',
    },
    caracteristicTitle: {
        fontWeight: 900,
        paddingBottom: 10,
    },
    dividerVert: {
        backgroundColor: '#D5DCE8',
        width: 2,
        height: 'auto',
        margin: '20px 0 45px',
    },
    dividerHor: {
        backgroundColor: theme.palette.primary.light,
        width: '25%',
        height: 2,
    },
}));

const HelpCenter = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <PageContainer>
            <Grid container justify="center">
                <Grid item xs={11} sm={10} md={9}>
                    <Grid container alignItems="center" justify="space-evenly" spacing={2}>
                        <Grid item xs={12} style={{ padding: '20px 20px 0' }}>
                            <Typography className={classes.categoryTitle} variant="h1" color="secondary">
                                {t('helpCenter.title')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6}>
                            <div className={classes.sideText} style={{ textAlign: 'right' }}>
                                <Typography color="primary" variant="h4" style={{ fontWeight: 900 }}>
                                    {t('helpCenter.why')}
                                </Typography>
                                <br />
                                <Typography className={classes.caracteristicText} variant="body1">
                                    {t('helpCenter.whyDesc')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <img src="blockchain.svg" alt="eos" className={classes.img} />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <img src="ticket.svg" alt="ticket" className={classes.img} />
                        </Grid>
                        <Grid item xs={12} sm={7} md={6}>
                            <div className={classes.sideText}>
                                <Typography color="primary" variant="h4" style={{ fontWeight: 900 }}>
                                    {t('helpCenter.nft')}
                                </Typography>
                                <br />
                                <Typography className={classes.caracteristicText} variant="subtitle1">
                                    {t('helpCenter.nftDesc')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid container justify="space-around" style={{ paddingTop: 20 }}>
                            <Grid item xs={11} sm={3}>
                                <Grid container>
                                    <Grid item sm={5}>
                                        <img src="safe.svg" alt="safe" className={classes.caracteristicImg} />
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Typography className={classes.caracteristicTitle} color="primary" variant="h4">
                                            {t('helpCenter.safe')}
                                        </Typography>
                                        <Typography className={classes.caracteristicText} variant="subtitle1">
                                            {t('helpCenter.safeDesc')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Hidden xsDown>
                                <Divider orientation="vertical" className={classes.dividerVert} />
                            </Hidden>
                            <Grid item xs={10} sm={3}>
                                <Grid container>
                                    <Grid item sm={6}>
                                        <img src="fast.svg" alt="safe" className={classes.caracteristicImg} />
                                    </Grid>
                                    <Grid item xs={7} sm={11}>
                                        <Typography className={classes.caracteristicTitle} color="primary" variant="h4">
                                            {t('helpCenter.fast')}
                                        </Typography>
                                        <Typography className={classes.caracteristicText} variant="body1">
                                            {t('helpCenter.fastDesc')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Hidden xsDown>
                                <Divider orientation="vertical" className={classes.dividerVert} />
                            </Hidden>
                            <Grid item xs={10} sm={3}>
                                <Grid container>
                                    <Grid item sm={6}>
                                        <img src="blockchain.svg" alt="safe" className={classes.caracteristicImg} />
                                    </Grid>
                                    <Grid item xs={8} sm={12}>
                                        <Typography className={classes.caracteristicTitle} color="primary" variant="h4">
                                            {t('helpCenter.eos')}
                                        </Typography>
                                        <Typography className={classes.caracteristicText} variant="body1">
                                            {t('helpCenter.eosDesc')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                padding: 60,
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                        >
                            <Divider className={classes.dividerHor} />
                            <Typography variant="h4" color="primary" style={{ fontWeight: 900, width: '40%' }}>
                                {t('helpCenter.technologies')}
                            </Typography>
                            <Divider className={classes.dividerHor} />
                        </div>
                        <div style={{ width: '100%' }}>
                            <Grid container justify="space-evenly" style={{ padding: '20px 20px' }}>
                                <Grid item sm={3} className={classes.greyContainer}>
                                    <a href="https://all-access.wax.io/">
                                        <img src="wax.svg" alt="wax" className={classes.greyImg} />
                                    </a>
                                </Grid>
                                <Grid item sm={3} className={classes.greyContainer}>
                                    <a href="https://dfuse.io/home/">
                                        <img src="dfuse.svg" alt="dfuse" className={classes.greyImg} />
                                    </a>
                                </Grid>
                                <Grid item sm={3} className={classes.greyContainer}>
                                    <a href="https://eos.io/">
                                        <img src="eosio.svg" alt="eosio" className={classes.greyImg} />
                                    </a>
                                </Grid>
                            </Grid>
                        </div>
                        <div style={{ width: '100%' }}>
                            <Grid container justify="space-evenly" style={{ padding: '40px 10px 80px' }}>
                                <Grid item sm={4} className={classes.greyContainer}>
                                    <a href="https://atomicassets.io/">
                                        <img src="atomic.svg" alt="atomic" className={classes.greyImg} />
                                    </a>
                                </Grid>
                                <Grid item sm={4} className={classes.greyContainer}>
                                    <a href="https://greymass.com/anchor/">
                                        <img src="anchor.svg" alt="anchor" className={classes.greyImg} />
                                    </a>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

HelpCenter.propTypes = {};

export default HelpCenter;
