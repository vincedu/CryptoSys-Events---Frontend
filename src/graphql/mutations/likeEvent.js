import { gql } from '@apollo/client';

const LIKE_EVENT_MUTATION = gql`
    mutation($input: any!) {
        likeEvent(input: $input) @rest(type: "Post", path: "/user/like", method: "POST") {
            liked
        }
    }
`;

export default LIKE_EVENT_MUTATION;
