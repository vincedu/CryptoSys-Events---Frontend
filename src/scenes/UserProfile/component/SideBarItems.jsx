import React from 'react';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
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
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <List>
            <Link to="/accountSettings" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon style={{ color: '#FFF' }} />
                    </ListItemIcon>
                    <ListItemText primary="Account Settings" />
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
                    <Link to="/myTickets" className={classes.link}>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <ConfirmationNumberIcon style={{ color: '#FFF' }} />
                            </ListItemIcon>
                            <ListItemText primary="My Tickets" />
                        </ListItem>
                    </Link>

                    <Link to="/sellTickets" className={classes.link}>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <ConfirmationNumberIcon style={{ color: '#FFF' }} />
                            </ListItemIcon>
                            <ListItemText primary="Sell Tickets" />
                        </ListItem>
                    </Link>
                </List>
            </Collapse>

            <Link to="/manageEvents" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                        <EventIcon style={{ color: '#FFF' }} />
                    </ListItemIcon>
                    <ListItemText primary="Manage Events" />
                </ListItem>
            </Link>
        </List>
    );
};

export default SidebarItems;
