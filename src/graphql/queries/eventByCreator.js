import { gql } from '@apollo/client';

const EVENTS_BY_CREATOR_QUERY = gql`
    query eventsByCreator($createdBy: String) {
        eventsByCreator(createdBy: $createdBy) {
            id
            name
            description
            type
            category
            image
            startDate
            category
            languages
            tags
            location {
                type
                location
            }
        }
    }
`;

export default EVENTS_BY_CREATOR_QUERY;
