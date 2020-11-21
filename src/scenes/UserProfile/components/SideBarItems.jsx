import React, { useState } from 'react';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import EventIcon from '@material-ui/icons/Event';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    link: {
        color: '#FFF',
        textDecoration: 'none',
    },
}));

const SidebarItems = (props) => {
    const [open, setOpen] = useState(false);
    const [sideBarTab, setSideBarTab] = useState(0);
    // Fermé sous-onglet Tickets quand le drawer est fermé
    if (!props.drawerOpen && open) setOpen(false);
    const closeIfXS = () => {
        if (window.innerWidth < 600) props.handleDrawerToggle(false);
    };
    switch (window.location.pathname) {
        case '/userProfile/accountSettings':
            if (sideBarTab !== 0) {
                setSideBarTab(0);
                closeIfXS();
            }
            break;
        case '/userProfile/myTickets':
            if (sideBarTab !== 1) {
                setSideBarTab(1);
                if (!open) setOpen(true);
                closeIfXS();
            }
            break;
        case '/userProfile/sellTickets':
            if (sideBarTab !== 2) {
                setSideBarTab(2);
                if (!open) setOpen(true);
                closeIfXS();
            }
            break;
        case '/userProfile/manageEvents':
            if (sideBarTab !== 3) {
                setSideBarTab(3);
                closeIfXS();
            }
            break;
        case '/userProfile/liked':
            if (sideBarTab !== 4) {
                setSideBarTab(4);
                closeIfXS();
            }
            break;
        default:
    }

    const classes = useStyles();
    const { t } = useTranslation();

    const handleTicketList = () => {
        // Ouvrir drawer si le sous-onglet Tickets est ouvert
        if (!open) props.handleDrawerToggle(true);
        setOpen(!open);
    };

    return (
        <List style={{ paddingTop: 0 }}>
            <Link to="/userProfile/accountSettings" className={classes.link}>
                <ListItem button selected={sideBarTab === 0}>
                    <ListItemIcon>
                        <SettingsIcon style={{ color: '#FFF' }} />
                    </ListItemIcon>
                    <ListItemText primary={t('sideBar.accountSettings')} />
                </ListItem>
            </Link>
            {/* Afficher comme selectionné si le drawer est fermé et que l'une des 2 pages de billet est selectionnée */}
            <ListItem
                button
                onClick={handleTicketList}
                selected={(sideBarTab === 1 || sideBarTab === 2) && !props.drawerOpen}
            >
                <ListItemIcon>
                    <ConfirmationNumberIcon style={{ color: '#FFF' }} />
                </ListItemIcon>
                <ListItemText primary="Tickets" style={{ color: '#FFF' }} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                    <Link to="/userProfile/myTickets" className={classes.link}>
                        <ListItem button className={classes.nested} selected={sideBarTab === 1}>
                            <ListItemIcon>
                                <ConfirmationNumberIcon style={{ color: '#FFF' }} />
                            </ListItemIcon>
                            <ListItemText primary={t('sideBar.myTickets')} />
                        </ListItem>
                    </Link>

                    <Link to="/userProfile/sellTickets" className={classes.link}>
                        <ListItem button className={classes.nested} selected={sideBarTab === 2}>
                            <ListItemIcon>
                                <LocalAtmIcon style={{ color: '#FFF' }} />
                            </ListItemIcon>
                            <ListItemText primary={t('sideBar.sellTickets')} />
                        </ListItem>
                    </Link>
                </List>
            </Collapse>

            <Link to="/userProfile/manageEvents" className={classes.link}>
                <ListItem button selected={sideBarTab === 3}>
                    <ListItemIcon>
                        <EventIcon style={{ color: '#FFF' }} />
                    </ListItemIcon>
                    <ListItemText primary={t('sideBar.manage')} />
                </ListItem>
            </Link>
            <Link to="/userProfile/liked" className={classes.link}>
                <ListItem button selected={sideBarTab === 4}>
                    <ListItemIcon>
                        <FavoriteIcon style={{ color: '#FFF' }} />
                    </ListItemIcon>
                    <ListItemText primary={t('sideBar.liked')} />
                </ListItem>
            </Link>
        </List>
    );
};

SidebarItems.propTypes = {
    handleDrawerToggle: PropTypes.func.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
};

export default SidebarItems;
