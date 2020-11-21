import React, { useContext } from 'react';
import { makeStyles, ListItemAvatar, Divider, ListItem, ListItemText, Avatar, IconButton } from '@material-ui/core';
import { ChevronLeft, Menu } from '@material-ui/icons';
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
        transition: 'width 0.3s, height 0.3s',
        backgroundColor: theme.palette.secondary.main,
    },
    avatarSmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    user: {
        transition: 'padding-top 0.3s, padding-bottom 0.3s',
        background: 'lightgray',
        padding: '17px 15px',
    },
    userListSmall: {
        paddingTop: 2,
        paddingBottom: 2,
    },
    toolbar: theme.mixins.toolbar,
}));

const SideBar = (props) => {
    const classes = useStyles();
    const { userData } = useContext(AuthContext);
    const user = firebase.auth().currentUser;
    console.log(props.drawerOpen);
    return (
        <div className={classes.sidebar}>
            <IconButton style={{ padding: 16 }} onClick={() => props.handleDrawerToggle()}>
                {props.drawerOpen ? <ChevronLeft /> : <Menu />}
            </IconButton>
            <div className={`${classes.user} ${props.drawerOpen ? null : classes.userListSmall}`}>
                <ListItem style={{ padding: 0 }}>
                    <ListItemAvatar>
                        <Avatar className={`${classes.avatar} ${props.drawerOpen ? null : classes.avatarSmall}`} />
                    </ListItemAvatar>
                    <ListItemText
                        classes={{ primary: classes.primaryText, secondary: classes.secondaryText }}
                        primary={userData && userData.displayName ? userData.displayName : null}
                        secondary={user && user.email ? user.email : null}
                    />
                </ListItem>
            </div>
            <Divider />
            <SidebarItems drawerOpen={props.drawerOpen} handleDrawerToggle={props.handleDrawerToggle} />
        </div>
    );
};

SideBar.propTypes = {
    handleDrawerToggle: PropTypes.func,
    drawerOpen: PropTypes.bool.isRequired,
};

SideBar.defaultProps = {
    handleDrawerToggle: () => {},
};

export default SideBar;
