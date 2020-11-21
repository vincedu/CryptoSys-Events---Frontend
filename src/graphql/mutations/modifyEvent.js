import { gql } from '@apollo/client';

const MODIFY_EVENT_MUTATION = gql`
    mutation(
        $eventId: String!
        $name: String
        $description: String
        $type: String
        $category: String
        $imageFile: Upload
        $languages: [String]
        $tags: [String]
        $location: String
        $locationType: String
        $startDate: DateTime
        $endDate: DateTime
    ) {
        modifyEvent(
            eventId: $eventId
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
            id
        }
    }
`;

export default MODIFY_EVENT_MUTATION;
