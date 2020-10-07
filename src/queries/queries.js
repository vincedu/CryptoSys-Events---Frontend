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

const uploadFileMutation = gql`
    mutation($file: Upload!) {
        uploadFile(file: $file) {
            uri
        }
    }
`;
export { createEventMutation, uploadFileMutation };
