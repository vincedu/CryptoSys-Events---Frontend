import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const HelpMenu = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const { history } = props;

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleButtonClick = (pageURL) => {
        history.push(pageURL);
    };

    const menuId = 'help-menu';
    const renderHelpMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleButtonClick('/howItWorks')}>How it works</MenuItem>
            <MenuItem onClick={() => handleButtonClick('/helpCenter')}>Help Center</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.menuButton}>
            <Button
                aria-label="help menu"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
            >
                Help
            </Button>
            {renderHelpMenu}
        </div>
    );
};

HelpMenu.propTypes = {
    history: PropTypes.node.isRequired,
};

export default HelpMenu;
