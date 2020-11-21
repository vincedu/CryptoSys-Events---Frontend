import { gql } from '@apollo/client';

const TICKETS_SALES_BY_ACCOUNT_NAME_QUERY = gql`
    query ticketsSalesByAccountName($createdBy: String!) {
        ticketsSalesByAccountName(createdBy: $createdBy) {
            id
            name
            description
            type
            category
            image
            startDate
            category
            languages
            tags
            location {
                type
                location
            }
            ticketsListedSale {
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

            ticketsSoldSale {
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
    }
`;

export default TICKETS_SALES_BY_ACCOUNT_NAME_QUERY;
