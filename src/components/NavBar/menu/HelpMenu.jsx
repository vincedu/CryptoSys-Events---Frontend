import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Popper,
    Paper,
    ClickAwayListener,
    MenuItem,
    makeStyles,
    MenuList,
    Grow,
    Hidden,
    IconButton,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
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

const HelpMenu = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = useState(null);

    const history = useHistory();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleButtonClick = (pageURL) => {
        setAnchorEl(null);
        history.push(pageURL);
    };

    const renderHelpMenu = (
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end" disablePortal transition>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'right bottom' : 'right top' }}
                >
                    <Paper style={{ borderRadius: 3 }}>
                        <ClickAwayListener onClickAway={handleMenuClose}>
                            <MenuList style={{ padding: 0 }}>
                                <Hidden smUp>
                                    <MenuItem
                                        className={classes.menuItem}
                                        onClick={() => handleButtonClick('/createEvent/general')}
                                    >
                                        {t('navBar.create')}
                                    </MenuItem>
                                    <hr className={classes.horizontalLine} />
                                </Hidden>
                                <MenuItem className={classes.menuItem} onClick={() => handleButtonClick('/helpCenter')}>
                                    {t('navBar.helpCenter')}
                                </MenuItem>
                                <MenuItem className={classes.menuItem} onClick={() => handleButtonClick('/getStarted')}>
                                    {t('navBar.getStarted')}
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );

    return (
        <>
            <Hidden xsDown>
                <Button onClick={handleMenuOpen} color={anchorEl ? 'secondary' : 'inherit'}>
                    {t('navBar.help')}
                </Button>
            </Hidden>
            <Hidden smUp>
                <IconButton onClick={handleMenuOpen} color={anchorEl ? 'secondary' : 'inherit'}>
                    <MoreVert />
                </IconButton>
            </Hidden>
            {renderHelpMenu}
        </>
    );
};

HelpMenu.propTypes = {};

export default HelpMenu;
