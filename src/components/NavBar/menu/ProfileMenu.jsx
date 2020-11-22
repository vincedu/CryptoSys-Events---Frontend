import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Popper,
    ListItemIcon,
    IconButton,
    MenuItem,
    ListItemText,
    makeStyles,
    Paper,
    ClickAwayListener,
    MenuList,
    Grow,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import { withUAL } from 'ual-reactjs-renderer';
import { AuthContext } from '@providers';

const useStyles = makeStyles((theme) => ({
    primaryText: {
        color: theme.palette.primary.dark,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    secondaryText: {
        fontSize: 'small',
        color: theme.palette.primary.dark,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    horizontalLine: {
        margin: 0,
        border: 0,
        height: 1,
        backgroundColor: 'lightgray',
    },
    menuItem: {
        padding: '12px 25px',
    },
}));

const ProfileMenu = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { userData } = useContext(AuthContext);
    const user = firebase.auth().currentUser;

    const { ual } = props;
    const { t } = useTranslation();
    const history = useHistory();

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

    const renderProfileMenu = (
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end" transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'right bottom' : 'right top' }}
                >
                    <Paper style={{ borderRadius: 3, maxWidth: 250 }}>
                        <ClickAwayListener onClickAway={handleMenuClose}>
                            <MenuList style={{ padding: 0 }}>
                                <MenuItem
                                    className={classes.menuItem}
                                    style={{ paddingLeft: 15 }}
                                    onClick={() => handleButtonClick('/userProfile/accountSettings')}
                                >
                                    <ListItemIcon style={{ minWidth: 45 }}>
                                        <AccountCircle fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{ primary: classes.primaryText, secondary: classes.secondaryText }}
                                        primary={userData?.displayName ? userData.displayName : null}
                                        secondary={user?.email ? user.email : null}
                                    />
                                </MenuItem>
                                <hr className={classes.horizontalLine} />
                                <MenuItem className={classes.menuItem} onClick={() => handleButtonClick('/search')}>
                                    {t('profileMenu.browse')}
                                </MenuItem>
                                <hr className={classes.horizontalLine} />
                                <MenuItem
                                    className={classes.menuItem}
                                    onClick={() => handleButtonClick('/userProfile/accountSettings')}
                                >
                                    {t('profileMenu.profile')}
                                </MenuItem>
                                <MenuItem
                                    className={classes.menuItem}
                                    onClick={() => handleButtonClick('/userProfile/myTickets')}
                                >
                                    {t('profileMenu.tickets')}
                                </MenuItem>
                                <MenuItem
                                    className={classes.menuItem}
                                    onClick={() => handleButtonClick('/userProfile/liked')}
                                >
                                    {`${t('profileMenu.liked')} (${userData.liked ? userData.liked.length : 0})`}
                                </MenuItem>
                                <hr className={classes.horizontalLine} />
                                <MenuItem
                                    className={classes.menuItem}
                                    onClick={() => handleButtonClick('/createEvent/general')}
                                >
                                    {t('profileMenu.create')}
                                </MenuItem>
                                <MenuItem
                                    className={classes.menuItem}
                                    onClick={() => handleButtonClick('/userProfile/manageEvents')}
                                >
                                    {t('profileMenu.manage')}
                                </MenuItem>
                                <MenuItem
                                    className={classes.menuItem}
                                    onClick={() => handleButtonClick('/userProfile/accountSettings')}
                                >
                                    {t('profileMenu.settings')}
                                </MenuItem>
                                <MenuItem className={classes.menuItem} onClick={handleSignOut}>
                                    {t('profileMenu.signOut')}
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );

    return (
        <div>
            <IconButton onClick={handleMenuOpen} color={anchorEl ? 'secondary' : 'inherit'}>
                <AccountCircle />
            </IconButton>
            {renderProfileMenu}
        </div>
    );
};

ProfileMenu.propTypes = {
    ual: PropTypes.object.isRequired,
};

export default withUAL(ProfileMenu);
