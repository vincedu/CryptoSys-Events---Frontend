import React from 'react';
import PropTypes from 'prop-types';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';

const MobileMenu = (props) => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const { history } = props;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleButtonClick = (pageURL) => {
        history.push(pageURL);
    };

    const menuId = 'mobile-menu';
    const renderMobileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleButtonClick('/howItWorks')}>{t('navBar.howItWorks')}</MenuItem>
            <MenuItem onClick={() => handleButtonClick('/helpCenter')}>{t('navBar.helpCenter')}</MenuItem>
        </Menu>
    );

    return (
        <div>
            <IconButton
                aria-label="show more"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
            >
                <MoreIcon />
            </IconButton>
            {renderMobileMenu}
        </div>
    );
};

MobileMenu.propTypes = {
    history: PropTypes.object.isRequired,
};

export default MobileMenu;
