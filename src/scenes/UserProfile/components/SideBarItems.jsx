import React, { useState } from 'react';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { useTranslation } from 'react-i18next';
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

const SidebarItems = () => {
    const [sideBarTab, setSideBarTab] = useState(0);
    switch (window.location.pathname) {
        case '/userProfile/accountSettings':
            if (sideBarTab !== 0) {
                setSideBarTab(0);
            }
            break;
        case '/userProfile/myTickets':
            if (sideBarTab !== 1) {
                setSideBarTab(1);
            }
            break;
        case '/userProfile/sellTickets':
            if (sideBarTab !== 2) {
                setSideBarTab(2);
            }
            break;
        case '/userProfile/manageEvents':
            if (sideBarTab !== 3) {
                setSideBarTab(3);
            }
            break;
        default:
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const { t } = useTranslation();

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <List>
            <Link to="/userProfile/accountSettings" className={classes.link}>
                <ListItem button selected={sideBarTab === 0}>
                    <ListItemIcon>
                        <SettingsIcon style={{ color: '#FFF' }} />
                    </ListItemIcon>
                    <ListItemText primary={t('sideBar.accountSettings')} />
                </ListItem>
            </Link>

            <ListItem button onClick={handleClick}>
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
                                <ConfirmationNumberIcon style={{ color: '#FFF' }} />
                            </ListItemIcon>
                            <ListItemText primary={t('sideBar.sellTickets')} />
                        </ListItem>
                    </Link>
                </List>
            </Collapse>

            <Link to="/userProfile/manageEvents" className={classes.link} selected={sideBarTab === 3}>
                <ListItem button>
                    <ListItemIcon>
                        <EventIcon style={{ color: '#FFF' }} />
                    </ListItemIcon>
                    <ListItemText primary={t('sideBar.manage')} />
                </ListItem>
            </Link>
        </List>
    );
};

export default SidebarItems;
