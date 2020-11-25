import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContainer, TitledPaper } from '@components';
import CreatedEventList from './CreatedEventList/CreatedEventList';
import GlobalStats from './GlobalStats/GlobalStats';

const Dashboard = () => {
    const { t } = useTranslation();
    return (
        <PageContainer>
            <TitledPaper title={t('eventsDashboard.title')}>
                <GlobalStats />
                <CreatedEventList />
            </TitledPaper>
        </PageContainer>
    );
};

Dashboard.propTypes = {};
Dashboard.defaultProps = {
    title: '',
};

export default Dashboard;
