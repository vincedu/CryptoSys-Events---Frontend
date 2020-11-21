import { gql } from '@apollo/client';

const EVENT_BY_ID_QUERY = gql`
    query eventById($id: String) {
        eventById(id: $id) {
            id
            createdBy
            name
            description
            type
            category
            image
            startDate
            endDate
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

export default EVENT_BY_ID_QUERY;
