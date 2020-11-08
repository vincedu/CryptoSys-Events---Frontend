import { gql } from '@apollo/client';

const LINK_NFT_TEMPLATES_TO_EVENT_MUTATION = gql`
    mutation($eventId: String!, $templateIds: [String]!) {
        linkNftTemplatesToEvent(eventId: $eventId, templateIds: $templateIds) {
            id
        }
    }
`;

export default LINK_NFT_TEMPLATES_TO_EVENT_MUTATION;
