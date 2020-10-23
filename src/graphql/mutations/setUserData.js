import { gql } from '@apollo/client';

const SET_USER_DATA_MUTATION = gql`
    mutation($input: any!) {
        setUserData(input: $input) @rest(type: "Post", path: "/user/data", method: "POST") {
            userData
        }
    }
`;

export default SET_USER_DATA_MUTATION;
