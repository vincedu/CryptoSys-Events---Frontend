import { gql } from '@apollo/client';

const EVENTS_BY_IDS_QUERY = gql`
    query eventsByIds($ids: [String]) {
        eventsByIds(ids: $ids) {
            id
            name
            description
            type
            image
            startDate
            category
        }
    }
`;

export default EVENTS_BY_IDS_QUERY;
