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

const useStyles = makeStyles((theme) => ({
    drawer: {
        whiteSpace: 'nowrap',
        zIndex: 2,
    },
    drawerPaper: {
        background: theme.palette.primary.main,
        borderRight: 0,
        top: 'auto',
    },
    drawerOpen: {
        width: 240,
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
    const { loading, data, refetch } = useQuery(TICKETS_FOR_EVENTS_BY_ACCOUNT_NAME_QUERY, {
        variables: { accountName: userData.walletAccountName },
        fetchPolicy: 'network-only',
    });
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(window.innerWidth > 600);

    let myTickets;
    let sellTickets;
    if (data) {
        myTickets = data.ticketsForEventsByAccountName.myTickets;
        sellTickets = data.ticketsForEventsByAccountName.sellTickets;
    }

    const handleDrawerToggle = (open = !drawerOpen) => {
        setDrawerOpen(open);
    };

    return (
        <div style={{ display: 'flex', overflowX: 'hidden' }}>
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
            <main style={{ flexGrow: 1 }}>
                <Switch>
                    <Route path="/userProfile/accountSettings" component={AccountSettings} />
                    <Route
                        path="/userProfile/myTickets"
                        render={(props) => (
                            <MyTicketList
                                {...props}
                                loading={loading}
                                tickets={myTickets}
                                refetch={refetch}
                                myTickets
                            />
                        )}
                    />
                    <Route
                        path="/userProfile/sellTickets"
                        render={(props) => (
                            <SellTicketList {...props} loading={loading} tickets={sellTickets} refetch={refetch} />
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
