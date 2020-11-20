import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { AuthContext } from '@providers';
import QRCode from 'qrcode.react';

const TicketQRCode = (props) => {
    const { ticket } = props;
    const { userData } = useContext(AuthContext);
    const user = firebase.auth().currentUser;

    const QRCodeContent = {
        event: {
            id: ticket.eventId,
        },
        ticket: {
            templateId: ticket.templateId,
            assetId: ticket.assetId,
            name: ticket.name,
        },
        owner: {
            uid: user.uid,
            name: userData.displayName,
            walletAccountName: userData.walletAccountName,
        },
    };

    return <QRCode value={JSON.stringify(QRCodeContent)} />;
};

TicketQRCode.propTypes = {
    ticket: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        templateId: PropTypes.string.isRequired,
        eventId: PropTypes.string.isRequired,
        assetId: PropTypes.string.isRequired,
    }).isRequired,
};

export default TicketQRCode;
