import React from 'react';
import CreatedEventList from './CreatedEventList/CreatedEventList';

const Dashboard = () => {
    return <CreatedEventList />;
};

Dashboard.propTypes = {};
Dashboard.defaultProps = {
    title: '',
};

export default Dashboard;
