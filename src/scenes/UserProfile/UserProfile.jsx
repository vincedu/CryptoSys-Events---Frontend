import React, { useContext } from 'react';
import { makeStyles, CssBaseline, Hidden, Drawer, IconButton } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
=======
import { useTranslation } from 'react-i18next';
>>>>>>> Diviser billets entre a vendre ou pas
import { useQuery } from '@apollo/client';
import { TICKETS_FOR_EVENTS_BY_ACCOUNT_NAME_QUERY } from '@graphql/queries';
import { AuthContext } from '@providers';
import MenuIcon from '@material-ui/icons/Menu';
import { Dashboard } from '@scenes/';
import AccountSettings from './components/AccountSettings';
import MyTicketList from './components/MyTicketList';
import SellTicketList from './components/SellTicketList';
import SideBar from './components/SideBar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        overflow: 'auto',
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
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: theme.palette.primary.main,
        top: 60,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const UserProfile = () => {
    const { userData } = useContext(AuthContext);
    const eventsTickets = useQuery(TICKETS_FOR_EVENTS_BY_ACCOUNT_NAME_QUERY, {
        variables: { accountName: userData.walletAccountName },
    });
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    let myTickets;
    let sellTickets;
    if (eventsTickets.data) {
        myTickets = eventsTickets.data.ticketsForEventsByAccountName.myTickets;
        sellTickets = eventsTickets.data.ticketsForEventsByAccountName.sellTickets;
    }

    let myTickets;
    let sellTickets;
    if (eventsTickets.data) {
        myTickets = eventsTickets.data.ticketsForEventsByAccountName.myTickets;
        sellTickets = eventsTickets.data.ticketsForEventsByAccountName.sellTickets;
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer} aria-label="sidebar">
                <Hidden smUp>
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <SideBar />
                    </Drawer>
                </Hidden>
                <Hidden xsDown>
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <SideBar />
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
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
<<<<<<< HEAD
                    <Route path="/userProfile/manageEvents" component={Dashboard} />
=======
                    <Route path="/userProfile/manageEvents" render={() => <div>{t('sideBar.manage')}</div>} />
>>>>>>> Diviser billets entre a vendre ou pas
                </Switch>
            </main>
        </div>
    );
};

export default UserProfile;
