import React from 'react';
import { useQuery } from '@apollo/client';
import { TICKETS_SALES_BY_ACCOUNT_NAME_QUERY } from '@graphql/queries';
import { CircularProgress, Typography, Grid, makeStyles } from '@material-ui/core';
import TotalEventsWidget from './GlobalStatsWidgets/TotalEventsWidget';
import TotalSoldTicketsWidget from './GlobalStatsWidgets/TotalSoldTicketsWidget';
import TotalResaleTicketsWidget from './GlobalStatsWidgets/TotalResaleTicketsWidget';
import TotalRevenueWidget from './GlobalStatsWidgets/TotalRevenueWidget';
import {
    computeTotalEvents,
    computeTotalRevenue,
    computeTotalSoldTickets,
    computeTotalResaleTickets,
    computeTotalTickets,
} from '../computeStats';

const useStyles = makeStyles(() => ({
    widgetsContainer: {
        paddingBottom: '24px',
    },
}));

const GlobalStats = () => {
    const classes = useStyles();

    const query = useQuery(TICKETS_SALES_BY_ACCOUNT_NAME_QUERY, {
        variables: { createdBy: 'TODO enlever le param' },
    });

    let events;
    if (query.data) {
        events = query.data.ticketsSalesByAccountName;
    }

    return (
        <div>
            {query.loading ? (
                <CircularProgress />
            ) : (
                <div>
                    {events === undefined ? (
                        <Typography variant="h5">Failed fetching backend</Typography>
                    ) : (
                        <Grid container spacing={6} className={classes.widgetsContainer}>
                            <Grid item xs={4} sm={3}>
                                <TotalEventsWidget totalEvents={computeTotalEvents(events)} />
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <TotalSoldTicketsWidget
                                    totalSoldTickets={computeTotalSoldTickets(events)}
                                    totalTickets={computeTotalTickets(events)}
                                />
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <TotalResaleTicketsWidget totalResaleTickets={computeTotalResaleTickets(events)} />
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <TotalRevenueWidget totalRevenue={computeTotalRevenue(events)} />
                            </Grid>
                        </Grid>
                    )}
                </div>
            )}
        </div>
    );
};

export default GlobalStats;
