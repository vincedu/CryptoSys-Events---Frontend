import { gql } from '@apollo/client';

const PIN_TICKET_IMAGE_TO_IPFS_MUTATION = gql`
    mutation($file: Upload!, $ticketName: String!, $eventName: String!) {
        pinTicketImageToIpfs(ticketImage: { file: $file, ticketName: $ticketName, eventName: $eventName }) {
            ipfsHash
        }
    }
`;

export default PIN_TICKET_IMAGE_TO_IPFS_MUTATION;
