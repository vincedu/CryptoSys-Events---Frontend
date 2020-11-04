import React from 'react';
import { makeStyles, CssBaseline, Hidden, Drawer, IconButton } from '@material-ui/core';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountSettings from './component/AccountSettings';
import TicketList from './component/TicketList';
import SideBar from './component/SideBar';

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
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <BrowserRouter>
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
                        <Route path="/accountSettings" component={AccountSettings} />
                        <Route path="/myTickets" component={TicketList} />
                        <Route path="/sellTickets" render={() => <div> Sell Tickets </div>} />
                        <Route path="/manageEvents" render={() => <div> Manage Events </div>} />
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    );
};

export default UserProfile;
