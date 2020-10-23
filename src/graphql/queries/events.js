import { gql } from '@apollo/client';

const EVENTS_QUERY = gql`
    query {
        events {
            name
            description
            type
            category
            image
            startDate
        }
    }
`;

export default EVENTS_QUERY;
