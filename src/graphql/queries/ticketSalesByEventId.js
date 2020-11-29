import { gql } from '@apollo/client';

const TICKET_SALES_BY_EVENT_IDS_QUERY = gql`
    query ticketSalesByEventIds($eventIds: [String!]) {
        ticketSalesByEventIds(eventIds: $eventIds) {
            original {
                template {
                    templateId
                    maxSupply
                    eventId
                    name
                    description
                    image
                    creator
                }
                sales {
                    saleId
                    offerId
                    seller
                    price {
                        amount
                        currency
                    }
                    ticket {
                        assetId
                    }
                }
            }
            resale {
                template {
                    templateId
                    maxSupply
                    eventId
                    name
                    description
                    image
                }
                sales {
                    saleId
                    offerId
                    seller
                    price {
                        amount
                        currency
                    }
                    ticket {
                        assetId
                    }
                }
            }
        }
    }
`;

export default TICKET_SALES_BY_EVENT_IDS_QUERY;
