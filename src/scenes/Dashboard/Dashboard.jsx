import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@components';
import CreatedEventList from './CreatedEventList/CreatedEventList';
import GlobalStats from './GlobalStats/GlobalStats';

const Dashboard = () => {
    const { t } = useTranslation();
    return (
        <PageContainer title={t('eventsDashboard.title')}>
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
