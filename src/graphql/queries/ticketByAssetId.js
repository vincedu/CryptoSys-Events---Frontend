import { gql } from '@apollo/client';

const TICKET_BY_ASSET_ID_QUERY = gql`
    query ticketByAssetId($assetId: String!) {
        ticketByAssetId(assetId: $assetId) {
            templateId
            templateMint
            assetId
            owner
            eventId
            name
            description
            image
            opened
            used
        }
    }
`;

export default TICKET_BY_ASSET_ID_QUERY;
