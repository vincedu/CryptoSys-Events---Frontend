import React, { useContext } from 'react';
import { makeStyles, ListItemAvatar, Divider, ListItem, ListItemText, Avatar } from '@material-ui/core';
import firebase from 'firebase';
import { AuthContext } from '@providers';
import SidebarItems from './SideBarItems';

const useStyles = makeStyles((theme) => ({
    primaryText: {
        fontSize: '22px',
        color: '#FFF',
    },
    secondaryText: {
        color: '#FFF',
    },
    sidebar: {
        position: 'sticky',
    },
    avatar: {
        backgroundColor: '#e38360',
    },
    user: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

const SideBar = () => {
    const classes = useStyles();
    const { userData } = useContext(AuthContext);
    const user = firebase.auth().currentUser;
    return (
        <div className={classes.sidebar}>
            <div className={classes.user}>
                <ListItem style={{ padding: 0 }}>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        classes={{ primary: classes.primaryText, secondary: classes.secondaryText }}
                        primary={userData && userData.displayName ? userData.displayName : null}
                        secondary={user && user.email ? user.email : null}
                    />
                </ListItem>
            </div>
            <Divider />
            <SidebarItems />
        </div>
    );
};

export default SideBar;