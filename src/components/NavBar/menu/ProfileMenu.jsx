import React from 'react';
import PropTypes from 'prop-types';
import { Menu, ListItemIcon, Typography, IconButton, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import firebase from 'firebase';

const ProfileMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const { history } = props;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        handleMenuClose();
        firebase.auth().signOut();
        history.push('./signIn');
    };

    // const handleButtonClick = (pageURL) => {
    //     history.push(pageURL);
    // };

    const currentUser = firebase.auth().currentUser;

    const menuId = 'profile-menu';
    const renderProfileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem style={{ width: '180px' }}>
                <ListItemIcon>
                    <AccountCircle fontSize="large" />
                </ListItemIcon>
                <Typography variant="h6">{currentUser.displayName}</Typography>
            </MenuItem>
            <hr />
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Manage Events</MenuItem>
            <hr />
            <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
    );

    return (
        <div>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            {renderProfileMenu}
        </div>
    );
};

ProfileMenu.propTypes = {
    history: PropTypes.node.isRequired,
};

export default ProfileMenu;
