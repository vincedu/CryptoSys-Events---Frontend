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

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
        },
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
                                <MenuItem className={classes.menuItem} onClick={() => handleButtonClick('/search')}>
                                    {t('profileMenu.browse')}
                                </MenuItem>
                                <Hidden smUp>
                                    <MenuItem
                                        className={classes.menuItem}
                                        onClick={() => handleButtonClick('/createEvent/general')}
                                    >
                                        {t('navBar.create')}
                                    </MenuItem>
                                </Hidden>
                                <hr className={classes.horizontalLine} />
                                <MenuItem className={classes.menuItem} onClick={() => handleButtonClick('/helpCenter')}>
                                    {t('navBar.helpCenter')}
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );

    return (
        <div className={classes.menuButton}>
            <Hidden xsDown>
                <Button onClick={() => handleButtonClick('/helpCenter')} color="inherit">
                    {t('navBar.help')}
                </Button>
            </Hidden>
            <Hidden smUp>
                <IconButton onClick={handleMenuOpen} color={anchorEl ? 'secondary' : 'inherit'}>
                    <MoreVert />
                </IconButton>
            </Hidden>
            {renderHelpMenu}
        </div>
    );
};

HelpMenu.propTypes = {};

export default HelpMenu;
