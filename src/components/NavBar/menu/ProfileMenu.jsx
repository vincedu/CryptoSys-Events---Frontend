import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, ListItemIcon, IconButton, MenuItem, ListItemText } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import { withUAL } from 'ual-reactjs-renderer';
import { AuthContext } from '@providers';

const ProfileMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { userData } = useContext(AuthContext);
    const user = firebase.auth().currentUser;

    const isMenuOpen = Boolean(anchorEl);

    const { history, ual } = props;
    const { t } = useTranslation();

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

    const handleButtonClick = (pageURL) => {
        history.push(pageURL);
    };

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
            <MenuItem style={{ width: '220px' }} onClick={() => handleButtonClick('/userProfile')}>
                <ListItemIcon style={{ minWidth: '45px' }}>
                    <AccountCircle fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    primary={userData && userData.displayName ? userData.displayName : null}
                    secondary={user && user.email ? user.email : null}
                />
            </MenuItem>
            <hr />
            <MenuItem onClick={handleMenuClose}>{t('profileMenu.profile')}</MenuItem>
            <MenuItem onClick={handleMenuClose}>{t('profileMenu.manage')}</MenuItem>
            <hr />
            <MenuItem onClick={handleMenuClose}>{t('profileMenu.settings')}</MenuItem>
            <MenuItem onClick={handleSignOut}>{t('profileMenu.signOut')}</MenuItem>
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
