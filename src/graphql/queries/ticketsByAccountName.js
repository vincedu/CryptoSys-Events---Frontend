import { gql } from '@apollo/client';

const TICKET_SALES_BY_EVENT_ID_QUERY = gql`
    query ticketSalesByEventId($accountName: String!) {
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

export default TICKET_SALES_BY_EVENT_ID_QUERY;
