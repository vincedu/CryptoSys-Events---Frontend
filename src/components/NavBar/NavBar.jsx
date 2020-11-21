import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button, Typography, Hidden, fade, makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AutoComplete } from '@components';
import firebase from 'firebase';
import HelpMenu from './menu/HelpMenu';
import ProfileMenu from './menu/ProfileMenu';

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: 'background-color 0.6s',
        position: 'sticky',
        zIndex: theme.zIndex.drawer + 1, // Clip sidebar drawer under navbar
    },
    appBarMainPage: {
        position: 'fixed',
    },
    title: {
        marginTop: '5px',
        fontFamily: `'Bebas Neue', sans-serif`,
        color: '#fff',
        fontSize: 40,
        lineHeight: 1,
    },
    avatar: {
        width: 'auto',
        height: '5vh',
    },
    search: {
        position: 'relative',
        borderRadius: 3,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
        },
        [theme.breakpoints.down('xs')]: {
            width: '30%',
        },
    },
    transparent: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    progressContainer: {
        width: '100%',
        height: 2,
    },
    progressBar: {
        height: 2,
        background: theme.palette.secondary.main,
        width: '0%',
    },
    hidden: {
        visibility: 'hidden',
    },
}));

const NavBar = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const mainPage = () => {
        switch (window.location.pathname) {
            case '/':
                return true;
            default:
                return false;
        }
    };

    let mainPageTheme = mainPage();
    const [transparent, setTransparent] = React.useState(true);
    const progressBar = useRef();

    // Change NavBar theme when scrolling
    function scrollFunction() {
        mainPageTheme = mainPage();
        if (window.pageYOffset > 0 && mainPageTheme) {
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / height) * 100;
            progressBar.current.style.width = `${scrolled}%`;
            if (transparent) setTransparent(false);
        } else if (window.pageYOffset === 0 && !transparent && mainPageTheme) {
            progressBar.current.style.width = '0%';
            setTransparent(true);
        } else if (!mainPageTheme) {
            progressBar.current.style.width = '0%';
        }
    }

    if (mainPageTheme) {
        window.onscroll = () => {
            scrollFunction();
        };
    }

    const [currentUser, setCurrentUser] = React.useState(null);

    firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
    });

    const isSignIn = Boolean(currentUser);

    const { history } = props;
    const searchBarRef = useRef();

    const handleButtonClick = (pageURL) => {
        history.push(pageURL);
    };

    return (
        <AppBar
            className={`${mainPageTheme ? classes.appBarMainPage : ''} ${classes.appBar} ${
                transparent && mainPageTheme ? classes.transparent : ''
            }`}
        >
            <Toolbar>
                <Button onClick={() => handleButtonClick('/')}>
                    <img src="/eos.svg" className={classes.avatar} alt="eos event" />
                    <Hidden smDown>
                        <Typography className={classes.title}>EOS Event</Typography>
                    </Hidden>
                </Button>
                <div
                    className={`${classes.search} ${transparent && mainPageTheme ? classes.hidden : ''}`}
                    ref={searchBarRef}
                >
                    <AutoComplete searchBarRef={searchBarRef} navbar />
                </div>

                <div style={{ flexGrow: 1 }} />

                <HelpMenu history={history} />
                <Hidden xsDown>
                    <Button color="inherit" onClick={() => handleButtonClick('/createEvent/general')}>
                        {t('navBar.create')}
                    </Button>
                </Hidden>
                {isSignIn ? (
                    <ProfileMenu history={history} />
                ) : (
                    <Button color="inherit" onClick={() => handleButtonClick('/signIn')} style={{ marginLeft: 16 }}>
                        {t('navBar.signIn')}
                    </Button>
                )}
            </Toolbar>
            <div className={classes.progressContainer}>
                <div className={classes.progressBar} ref={progressBar} />
            </div>
        </AppBar>
    );
};

NavBar.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
