import React from 'react';
import { PageContainer } from '@components';
import CreatedEventList from './CreatedEventList/CreatedEventList';
import GlobalStats from './GlobalStats/GlobalStats';

const Dashboard = () => {
    return (
        <PageContainer>
            <GlobalStats />
            <CreatedEventList />
        </PageContainer>
    );
};

Dashboard.propTypes = {};
Dashboard.defaultProps = {
    title: '',
};

export default Dashboard;
