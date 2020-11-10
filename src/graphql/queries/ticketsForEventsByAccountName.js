import { gql } from '@apollo/client';

const TICKETS_FOR_EVENTS_BY_ACCOUNT_NAME_QUERY = gql`
    query ticketsForEventsByAccountName($accountName: String!) {
        ticketsForEventsByAccountName(accountName: $accountName) {
            upcoming {
                event {
                    id
                    name
                    description
                    startDate
                    endDate
                    image
                }
                tickets {
                    template {
                        templateId
                        maxSupply
                        eventId
                        name
                        description
                        image
                    }
                    tickets {
                        assetId
                    }
                }
            }
            past {
                event {
                    id
                    name
                    description
                    startDate
                    endDate
                    image
                }
                tickets {
                    template {
                        templateId
                        maxSupply
                        eventId
                        name
                        description
                        image
                    }
                    tickets {
                        assetId
                    }
                }
            }
        }
    }
`;

export default TICKETS_FOR_EVENTS_BY_ACCOUNT_NAME_QUERY;
