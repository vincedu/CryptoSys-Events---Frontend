import { gql } from '@apollo/client';

const EVENTS_BY_PARAM_QUERY = gql`
    query eventsByParam(
        $category: String
        $name: String
        $tags: [String]
        $languages: [String]
        $type: String
        $offset: Int
        $limit: Int
    ) {
        eventsByParam(
            category: $category
            name: $name
            tags: $tags
            languages: $languages
            type: $type
            offset: $offset
            limit: $limit
        ) {
            id
            name
            description
            type
            category
            image
            startDate
            tags
            languages
        }
    }
`;

export default EVENTS_BY_PARAM_QUERY;
