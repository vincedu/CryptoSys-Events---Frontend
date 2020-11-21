import React, { useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles, Drawer } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { TICKETS_FOR_EVENTS_BY_ACCOUNT_NAME_QUERY } from '@graphql/queries';
import { AuthContext } from '@providers';
import { Dashboard } from '@scenes/';
import AccountSettings from './components/AccountSettings';
import MyTicketList from './components/MyTicketList';
import SellTicketList from './components/SellTicketList';
import SideBar from './components/SideBar';
import Liked from './components/Liked';

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
    const { userData } = useContext(AuthContext);
    const eventsTickets = useQuery(TICKETS_FOR_EVENTS_BY_ACCOUNT_NAME_QUERY, {
        variables: { accountName: userData.walletAccountName },
    });
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(window.innerWidth > 600);

    let myTickets;
    let sellTickets;
    if (eventsTickets.data) {
        myTickets = eventsTickets.data.ticketsForEventsByAccountName.myTickets;
        sellTickets = eventsTickets.data.ticketsForEventsByAccountName.sellTickets;
    }

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
                    <Route
                        path="/userProfile/myTickets"
                        render={(props) => (
                            <MyTicketList {...props} loading={eventsTickets.loading} tickets={myTickets} myTickets />
                        )}
                    />
                    <Route
                        path="/userProfile/sellTickets"
                        render={(props) => (
                            <SellTicketList {...props} loading={eventsTickets.loading} tickets={sellTickets} />
                        )}
                    />
                    <Route path="/userProfile/manageEvents" component={Dashboard} />
                    <Route path="/userProfile/liked" component={Liked} />
                </Switch>
            </main>
        </div>
    );
};

export default UserProfile;
