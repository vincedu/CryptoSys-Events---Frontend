import { gql } from '@apollo/client';

const TICKET_SALES_BY_EVENT_ID_QUERY = gql`
    query ticketSalesByEventId($eventId: String!) {
        ticketSalesByEventId(eventId: $eventId) {
            original {
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
                        owner
                        templateId
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
                        owner
                        templateId
                    }
                }
            }
        }
    }
`;

export default TICKET_SALES_BY_EVENT_ID_QUERY;
