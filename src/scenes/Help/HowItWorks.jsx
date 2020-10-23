import { PageContainer } from '@components/';
import React from 'react';
import { useQuery } from '@apollo/client';
import { EVENTS_BY_PARAM_QUERY } from '@graphql/queries';
import PropTypes from 'prop-types';

const HowItWorks = (props) => {
    const offset = 0;
    const limit = 4;
    console.log(props.location.state);
    const query = useQuery(EVENTS_BY_PARAM_QUERY, {
        variables: { name: 'Event Title', offset, limit },
    });

    console.log(query);
    return <PageContainer>How It Works</PageContainer>;
};

HowItWorks.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        state: PropTypes.shape({
            date: PropTypes.string,
            search: PropTypes.string,
            location: PropTypes.string,
        }),
    }).isRequired,
};

export default HowItWorks;
