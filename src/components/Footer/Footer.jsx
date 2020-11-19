import React from 'react';
import { Grid, Button, makeStyles, Typography, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        padding: '12px 40px',
        position: 'absolute',
        bottom: 0,
    },
    title: {
        marginTop: '5px',
        fontFamily: `'Bebas Neue', sans-serif`,
        color: '#fff',
        fontSize: 30,
        lineHeight: 1,
    },
    footerItems: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: 'auto',
        height: '4vh',
    },
    links: {
        color: '#fff',
        textDecoration: 'none',
    },
}));

const Footer = () => {
    const classes = useStyles();
    const { t, i18n } = useTranslation();

    return (
        <Grid container justify="space-between" className={classes.footer}>
            <Grid item xs={2} sm={3} className={classes.footerItems}>
                <img src="/eos.svg" className={classes.avatar} alt="eos event" />
                <Hidden xsDown>
                    <Typography className={classes.title}>EOS Event</Typography>
                </Hidden>
            </Grid>
            <Grid item xs={6} className={classes.footerItems} style={{ justifyContent: 'space-evenly' }}>
                <Hidden xsDown>
                    <Typography variant="caption">
                        <a href="https://eos.io/" target="_blank" rel="noopener noreferrer" className={classes.links}>
                            EOSIO
                        </a>
                    </Typography>
                </Hidden>
                <Typography variant="caption">
                    <a href="https://eosnation.io/" target="_blank" rel="noopener noreferrer" className={classes.links}>
                        EOS Nation
                    </a>
                </Typography>
                <Hidden xsDown>
                    <Typography variant="caption">
                        <a
                            href="mailto:info@eosnation.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.links}
                        >
                            {t('footer.contactUs')}
                        </a>
                    </Typography>
                </Hidden>
            </Grid>
            <Grid item xs={2} className={classes.footerItems} style={{ justifyContent: 'flex-end' }}>
                <Button onClick={() => i18n.changeLanguage(t('translation'))} className={classes.links}>
                    <img
                        src={`https://www.countryflags.io/${t('languageFlag')}/flat/16.png`}
                        style={{ paddingRight: 5 }}
                        alt=""
                    />
                    {t('translation')}
                </Button>
            </Grid>
        </Grid>
    );
};

export default Footer;
