import { gql } from '@apollo/client';

const DISTINCT_QUERY = gql`
    query distinct($attribute: String) {
        distinct(attribute: $attribute)
    }
`;

export default DISTINCT_QUERY;
