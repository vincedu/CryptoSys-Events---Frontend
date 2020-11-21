import React, { useState } from 'react';
import { makeStyles, Drawer } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AccountSettings from './components/AccountSettings';
import Liked from './components/Liked';
import TicketList from './components/TicketList';
import SideBar from './components/SideBar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
        background: theme.palette.primary.main,
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        background: 'white',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        overflowX: 'hidden',
    },
    drawerPaper: {
        background: theme.palette.primary.main,
        borderRight: 0,
        top: 'auto',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        background: theme.palette.primary.main,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
    },
}));

const UserProfile = () => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(window.innerWidth > 600);
    const { t } = useTranslation();

    const handleDrawerToggle = (open = !drawerOpen) => {
        setDrawerOpen(open);
    };

    return (
        <div className={classes.root}>
            <nav className={classes.drawer}>
                <Drawer
                    variant="permanent"
                    open={drawerOpen}
                    ModalProps={{ keepMounted: true }}
                    className={`${classes.drawer}
                        ${drawerOpen ? classes.drawerOpen : classes.drawerClose}`}
                    classes={{
                        paper: `${classes.drawerPaper}
                            ${drawerOpen ? classes.drawerOpen : classes.drawerClose}`,
                    }}
                >
                    <SideBar handleDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
                </Drawer>
            </nav>
            <main className={classes.content}>
                <Switch>
                    <Route path="/userProfile/accountSettings" component={AccountSettings} />
                    <Route path="/userProfile/myTickets" component={TicketList} />
                    <Route path="/userProfile/sellTickets" render={() => <div>{t('sideBar.sellTickets')}</div>} />
                    <Route path="/userProfile/manageEvents" render={() => <div>{t('sideBar.manage')}</div>} />
                    <Route path="/userProfile/liked" component={Liked} />
                </Switch>
            </main>
        </div>
    );
};

export default UserProfile;
