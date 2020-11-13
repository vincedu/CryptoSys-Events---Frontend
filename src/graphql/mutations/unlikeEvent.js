import { gql } from '@apollo/client';

const UNLIKE_EVENT_MUTATION = gql`
    mutation($input: any!) {
        unlikeEvent(input: $input) @rest(type: "Post", path: "/user/unlike", method: "POST") {
            liked
        }
    }
`;

export default UNLIKE_EVENT_MUTATION;
