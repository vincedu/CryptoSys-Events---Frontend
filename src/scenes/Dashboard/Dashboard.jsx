import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContainer, TitledPaper } from '@components';
import { TICKETS_SALES_BY_ACCOUNT_NAME_QUERY } from '@graphql/queries';
import { useQuery } from '@apollo/client';
import { CircularProgress, makeStyles } from '@material-ui/core';
import CreatedEventList from './CreatedEventList/CreatedEventList';
import GlobalStats from './GlobalStats/GlobalStats';

const Dashboard = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            padding: '16px',
            boxShadow: 'none',
            backgroundColor: 'transparent',
        },
        header: {
            paddingBottom: '16px',
        },
        title: {
            fontStyle: `'Roboto', sans-serif`,
            fontWeight: 900,
            color: '#242424',
            [theme.breakpoints.down('xs')]: {
                fontSize: '2em',
            },
        },
    }));
    const { t } = useTranslation();
    const events = useQuery(TICKETS_SALES_BY_ACCOUNT_NAME_QUERY, { fetchPolicy: 'network-only' });

    const now = new Date();
    const filterEvents = (eventsArray, isUpcoming) => {
        const eventsfiltered = [];
        eventsArray.data.ticketsSalesByAccountName.forEach((event) => {
            const eventDate = new Date(event.startDate);
            if (isUpcoming) {
                if (eventDate > now) {
                    eventsfiltered.push(event);
                }
            } else if (eventDate < now) {
                eventsfiltered.push(event);
            }
        });
        if (isUpcoming) {
            eventsfiltered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        } else {
            eventsfiltered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        }

        return eventsfiltered;
    };

    const classes = useStyles();
    return (
        <div className={classes.eventListContainer}>
            {events.loading ? (
                <CircularProgress />
            ) : (
                <PageContainer>
                    <TitledPaper title={t('eventsDashboard.title')}>
                        <GlobalStats />
                        <TitledPaper title={t('ticketList.upcoming')} />
                        <CreatedEventList events={filterEvents(events, true)} />
                        <TitledPaper title={t('ticketList.past')} />
                        <CreatedEventList events={filterEvents(events, false)} />
                    </TitledPaper>
                </PageContainer>
            )}
        </div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
