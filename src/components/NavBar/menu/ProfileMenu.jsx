import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, ListItemIcon, Typography, IconButton, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import firebase from 'firebase';
import { withUAL } from 'ual-reactjs-renderer';
import { AuthContext } from '@providers';

const ProfileMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { userData } = useContext(AuthContext);

    const isMenuOpen = Boolean(anchorEl);

    const { history, ual } = props;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        handleMenuClose();
        firebase.auth().signOut();
        ual.logout();
        history.push('./signIn');
    };

    // const handleButtonClick = (pageURL) => {
    //     history.push(pageURL);
    // };

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
                {userData && userData.displayName ? <Typography variant="h6">{userData.displayName}</Typography> : null}
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
    history: PropTypes.object.isRequired,
    ual: PropTypes.object.isRequired,
};

export default withUAL(ProfileMenu);
