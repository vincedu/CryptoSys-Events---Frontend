import { gql } from '@apollo/client';

const TICKET_BY_ACCOUNT_NAME_QUERY = gql`
    query ticketsByAccountName($accountName: String!) {
        ticketsByAccountName(accountName: $accountName) {
            assetId
            owner
            templateId
            eventId
            name
            description
            image
        }
    }
`;

export default TICKET_BY_ACCOUNT_NAME_QUERY;
