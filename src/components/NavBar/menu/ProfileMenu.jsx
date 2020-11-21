import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, ListItemIcon, IconButton, MenuItem, ListItemText } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import { withUAL } from 'ual-reactjs-renderer';
import { AuthContext } from '@providers';
import { QRCodeScanDialog } from '@scenes';

const ProfileMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { userData } = useContext(AuthContext);
    const [scanTicketDialogOpen, setScanTicketDialogOpen] = useState(null);
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
        history.push('/signIn');
    };

    const handleButtonClick = (pageURL) => {
        history.push(pageURL);
    };

    const handleScanTicketButtonClick = () => {
        setAnchorEl(null);
        setScanTicketDialogOpen(true);
    };

    const handleScanTicketDialogClose = () => {
        setScanTicketDialogOpen(false);
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
            <MenuItem style={{ width: '220px' }} onClick={() => handleButtonClick('/userProfile/accountSettings')}>
                <ListItemIcon style={{ minWidth: '45px' }}>
                    <AccountCircle fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    primary={userData && userData.displayName ? userData.displayName : null}
                    secondary={user && user.email ? user.email : null}
                />
            </MenuItem>
            <hr />
            <MenuItem onClick={() => handleButtonClick('/userProfile/accountSettings')}>
                {t('profileMenu.profile')}
            </MenuItem>
            <MenuItem onClick={() => handleButtonClick('/userProfile/manageEvents')}>
                {t('profileMenu.manage')}
            </MenuItem>
            <MenuItem onClick={handleScanTicketButtonClick}>{t('profileMenu.scanTicket')}</MenuItem>
            <QRCodeScanDialog open={scanTicketDialogOpen} onClose={handleScanTicketDialogClose} />
            <hr />
            <MenuItem onClick={() => handleButtonClick('/userProfile/accountSettings')}>
                {t('profileMenu.settings')}
            </MenuItem>
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
