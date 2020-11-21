import { gql } from '@apollo/client';

const TICKET_TEMPLATES_BY_EVENT_ID_QUERY = gql`
    query ticketTemplatesByEventId($eventId: String!) {
        ticketTemplatesByEventId(eventId: $eventId) {
            templateId
            name
            description
            maxSupply
            eventId
        }
    }
`;

export default TICKET_TEMPLATES_BY_EVENT_ID_QUERY;
