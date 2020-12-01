import React from 'react';
import { useQuery } from '@apollo/client';
import { TICKETS_SALES_BY_ACCOUNT_NAME_QUERY } from '@graphql/queries';
import { CircularProgress, Typography, Grid } from '@material-ui/core';
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

const GlobalStats = () => {
    const { data, loading } = useQuery(TICKETS_SALES_BY_ACCOUNT_NAME_QUERY);

    if (loading) return <CircularProgress />;

    let events;
    if (data) {
        events = data.ticketsSalesByAccountName;
    }

    return events ? (
        <Grid container spacing={6} style={{ paddingBottom: '24px' }}>
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
    ) : (
        <Typography variant="h5">Failed fetching backend</Typography>
    );
};

GlobalStats.propTypes = {};

export default GlobalStats;
