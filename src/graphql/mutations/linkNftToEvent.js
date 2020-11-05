import { gql } from '@apollo/client';

const LINK_NFT_TO_EVENT_MUTATION = gql`
    mutation($eventId: String!, $collectionName: String!, $schemaName: String!) {
        linkNftToEvent(eventId: $eventId, collectionName: $collectionName, schemaName: $schemaName) {
            id
        }
    }
`;

export default LINK_NFT_TO_EVENT_MUTATION;
