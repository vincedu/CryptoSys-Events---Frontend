import React, { useContext } from 'react';
import { makeStyles, ListItemAvatar, Divider, ListItem, ListItemText, Avatar } from '@material-ui/core';
import firebase from 'firebase';
import { AuthContext } from '@providers';
import PropTypes from 'prop-types';
import SidebarItems from './SideBarItems';

const useStyles = makeStyles((theme) => ({
    primaryText: {
        fontSize: 22,
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
    sidebar: {
        position: 'sticky',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        fontSize: '0.8em',
    },
    user: {
        flexGrow: 1,
        background: 'lightgray',
        padding: '17px 15px',
    },
    toolbar: theme.mixins.toolbar,
}));

const SideBar = (props) => {
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
            <SidebarItems handleDrawerToggle={props.handleDrawerToggle} />
        </div>
    );
};

SideBar.propTypes = {
    handleDrawerToggle: PropTypes.func,
};

SideBar.defaultProps = {
    handleDrawerToggle: () => {},
};

export default SideBar;
