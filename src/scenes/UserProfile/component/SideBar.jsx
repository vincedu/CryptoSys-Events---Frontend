import React from 'react';
import { makeStyles, Avatar, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import SideBarItems from './SideBarItems';

const useStyles = makeStyles((theme) => ({
    sidebar: {
        background: '#324856',
        position: 'sticky',
    },
    user: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

const SideBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            <div className={classes.toolbar} /> {/* Clip sidebar drawer under navbar */}
            <div className={classes.user}>
                <Avatar
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />
                <Typography variant="h6" noWrap>
                    Sandra Adams
                </Typography>
                <Typography color="textSecondary" noWrap gutterBottom>
                    sandra_88@gmail.com
                </Typography>
            </div>
            <Divider />
            <List>
                {SideBarItems.map((item) => (
                    <Link to={item.route}>
                        <ListItem button key={item.name}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );
};

export default SideBar;
