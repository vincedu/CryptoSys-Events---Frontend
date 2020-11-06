import { gql } from '@apollo/client';

const COLLECTIONS_BY_ACCOUNT_NAME_QUERY = gql`
    query collectionsByAccountName($accountName: String!) {
        collectionsByAccountName(accountName: $accountName) {
            collectionsName
        }
    }
`;

export default COLLECTIONS_BY_ACCOUNT_NAME_QUERY;
