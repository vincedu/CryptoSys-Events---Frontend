import React from 'react';
import { useQuery } from '@apollo/client';
import { EVENTS_BY_PARAM_QUERY } from '@graphql/queries';
import PropTypes from 'prop-types';

const HowItWorks = (props) => {
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

    const offset = 0;
    const limit = 4;
    console.log(props.location.state);
    const query = useQuery(EVENTS_BY_PARAM_QUERY, {
        variables: { name: 'Event Title', offset, limit },
    });

    console.log(query);
    return <div>How It Works</div>;
};

export default HowItWorks;
