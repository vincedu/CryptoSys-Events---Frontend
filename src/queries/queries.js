import { gql } from '@apollo/client';

const createEventMutation = gql`
    mutation(
        $name: String!
        $description: String!
        $type: String!
        $category: String!
        $imageFile: Upload!
        $languages: [String]!
        $tags: [String]!
        $location: String
        $locationType: String!
        $startDate: DateTime!
        $endDate: DateTime!
    ) {
        createEvent(
            event: {
                name: $name
                description: $description
                type: $type
                category: $category
                imageFile: $imageFile
                languages: $languages
                tags: $tags
                location: { type: $locationType, location: $location }
                startDate: $startDate
                endDate: $endDate
            }
        ) {
            name
            startDate
            endDate
        }
    }
`;

const eventsQuery = gql`
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

export { createEventMutation, eventsQuery };
