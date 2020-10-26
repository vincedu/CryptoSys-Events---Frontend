import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, InputBase, Typography, Hidden } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import HelpMenu from './menu/HelpMenu';
import ProfileMenu from './menu/ProfileMenu';
import MobileMenu from './menu/MobileMenu';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    mainLogo: {
        width: 'auto',
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
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const NavBar = (props) => {
    const classes = useStyles();

    const [currentUser, setCurrentUser] = React.useState(null);

    firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
    });

    const isSignIn = Boolean(currentUser);

    const { history } = props;

    const handleButtonClick = (pageURL) => {
        history.push(pageURL);
    };

    const handleCreateEventButtonClick = () => {
        if (isSignIn) {
            history.push('/createEvent/general');
        } else {
            history.push('/signIn');
        }
    };

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.mainLogo}>
                        <Button onClick={() => handleButtonClick('/')}>
                            <img src="eos.svg" className={classes.avatar} alt="eos event" />
                            <Hidden smDown>
                                <Typography className={classes.title}>EOS Event</Typography>
                            </Hidden>
                        </Button>
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <div className={classes.grow} />

                    <div className={classes.sectionDesktop}>
                        <HelpMenu history={history} />
                        <Button color="inherit" onClick={() => handleCreateEventButtonClick()}>
                            Create Event
                        </Button>
                    </div>
                    <div className={classes.sectionMobile}>
                        <MobileMenu history={history} />
                    </div>
                    {isSignIn ? (
                        <ProfileMenu history={history} />
                    ) : (
                        <Button color="inherit" onClick={() => handleButtonClick('/signIn')}>
                            Sign In
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

NavBar.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
