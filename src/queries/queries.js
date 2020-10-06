import { gql } from 'apollo-boost';

const createEventMutation = gql`
    mutation(
        $name: String!
        $description: String!
        $type: String!
        $category: String!
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

export { createEventMutation };
