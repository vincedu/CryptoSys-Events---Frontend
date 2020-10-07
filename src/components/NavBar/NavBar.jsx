import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton, InputBase, MenuItem, Menu, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    mainLogo: {
        width: 140,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
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
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [helpAnchorEl, setHelpAnchorEl] = React.useState(null);

    // const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isHelpMenuOpen = Boolean(helpAnchorEl);

    const { history } = props;

    // const handleProfileMenuOpen = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    // const handleMenuClose = () => {
    //   setAnchorEl(null);
    //   handleMobileMenuClose();
    // };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleHelpMenuOpen = (event) => {
        setHelpAnchorEl(event.currentTarget);
    };

    const handleHelpMenuClose = () => {
        setHelpAnchorEl(null);
    };

    const handleButtonClick = (pageURL) => {
        history.push(pageURL);
    };

    // const menuId = 'menu';
    // const renderMenu = (
    //   <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //     id={menuId}
    //     keepMounted
    //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //     open={isMenuOpen}
    //     onClose={handleMenuClose}
    //   >
    //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    //   </Menu>
    // );

    const helpMenuId = 'help-menu';
    const renderHelpMenu = (
        <Menu
            anchorEl={helpAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={helpMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isHelpMenuOpen}
            onClose={handleHelpMenuClose}
        >
            <MenuItem onClick={() => handleButtonClick('./howItWorks')}>How it works</MenuItem>
            <MenuItem onClick={() => handleButtonClick('./helpCenter')}>Help Center</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => handleButtonClick('./helpCenter')}>Help Center</MenuItem>
            <MenuItem onClick={() => handleButtonClick('./createEvent')}>Create Event</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.mainLogo}>
                        <Button onClick={() => handleButtonClick('/')}>
                            <Avatar src="eos.png" className={classes.avatar} />
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
                        <Button
                            aria-label="help menu"
                            aria-controls={helpMenuId}
                            aria-haspopup="true"
                            onClick={handleHelpMenuOpen}
                            color="inherit"
                        >
                            Help
                        </Button>
                        <Button color="inherit" onClick={() => handleButtonClick('/createEvent')}>
                            Create Event
                        </Button>
                        {/* <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            >
                            <AccountCircle />
                            </IconButton> */}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                    <div className={classes.signIn}>
                        <Button color="inherit" onClick={() => handleButtonClick('/signIn')}>
                            Sign In
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {/* {renderMenu} */}
            {renderHelpMenu}
        </div>
    );
};

NavBar.propTypes = {
    history: PropTypes.node.isRequired,
};

export default withRouter(NavBar);
