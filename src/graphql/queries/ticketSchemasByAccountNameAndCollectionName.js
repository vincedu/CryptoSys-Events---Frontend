import { gql } from '@apollo/client';

const TICKET_SCHEMAS_BY_ACCOUNT_NAME_AND_COLLECTION_NAME_QUERY = gql`
    query ticketSchemasByAccountNameAndCollectionName($accountName: String!, $collectionName: String!) {
        ticketSchemasByAccountNameAndCollectionName(accountName: $accountName, collectionName: $collectionName) {
            schemaName
        }
    }
`;

export default TICKET_SCHEMAS_BY_ACCOUNT_NAME_AND_COLLECTION_NAME_QUERY;
