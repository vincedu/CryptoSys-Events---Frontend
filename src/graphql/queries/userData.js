import { gql } from '@apollo/client';

const USER_DATA_QUERY = gql`
    query {
        userData @rest(type: "UserData", path: "/user/data") {
            displayName
            walletAccountName
            walletAuthType
        }
    }
`;

export default USER_DATA_QUERY;
