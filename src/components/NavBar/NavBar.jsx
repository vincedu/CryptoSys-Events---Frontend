import React, { useRef, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Hidden, makeStyles } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AutoComplete } from '@components';
import firebase from 'firebase';
import HelpMenu from './menu/HelpMenu';
import ProfileMenu from './menu/ProfileMenu';

const useStyles = makeStyles(() => ({
    appBar: {
        transition: 'background-color 0.5s',
        position: 'sticky',
        zIndex: 2,
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
    transparent: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    visible: {
        transition: 'opacity 0.5s',
        opacity: 100,
    },
    hidden: {
        opacity: 0,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const location = useLocation();
    const history = useHistory();
    const searchBarRef = useRef();

    const isMainPage = location.pathname === '/';
    const [transparent, setTransparent] = useState(isMainPage);

    if (isMainPage) {
        window.onscroll = () => {
            if (window.pageYOffset > 0) {
                setTransparent(false);
            } else if (window.pageYOffset === 0) {
                setTransparent(true);
            }
        };
    }

    const [currentUser, setCurrentUser] = React.useState(null);

    firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
    });

    const handleButtonClick = (pageURL) => {
        history.push(pageURL);
    };

    return (
        <AppBar
            className={`${isMainPage ? classes.appBarMainPage : ''} ${classes.appBar} ${
                transparent && isMainPage ? classes.transparent : ''
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
                    className={transparent && isMainPage ? classes.hidden : classes.visible}
                    ref={searchBarRef}
                    style={{ paddingLeft: 20 }}
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
                {currentUser ? (
                    <ProfileMenu history={history} />
                ) : (
                    <Button color="inherit" onClick={() => handleButtonClick('/signIn')} style={{ marginLeft: 16 }}>
                        {t('navBar.signIn')}
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

NavBar.propTypes = {};

export default NavBar;
