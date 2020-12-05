import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';
import QrReader from 'react-qr-reader';
import { TitledPaper, PageContainer } from '@components';
import { useTranslation } from 'react-i18next';
import { EVENT_BY_ID_QUERY } from '@graphql/queries';
import { useQuery } from '@apollo/client';
import CustomEventItem from '../SearchPage/components/CustomEventItem';

const QRCodeScanDialog = (props) => {
    const { t } = useTranslation();
    const [result, setresult] = useState(null);
    const { open, onClose } = props;

    const query = useQuery(EVENT_BY_ID_QUERY, {
        variables: { id: null },
    });

    const fetchEvent = (id) => {
        query
            .fetchMore({
                variables: { id },
            })
            .then((event) => {
                if (event.data.eventById) setresult(event.data.eventById);
                else setresult(t('scanTicket.noResult'));
            });
    };

    const handleScan = (data) => {
        if (data) {
            fetchEvent(JSON.parse(data).event.id);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <PageContainer>
                <TitledPaper title={t('scanTicket.holdSteady')}>
                    <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
                    {result?.id ? (
                        <div style={{ paddingTop: 25 }}>
                            <CustomEventItem
                                id={result.id}
                                name={result.name}
                                description={result.description}
                                date={result.startDate}
                                image={result.image}
                                type={result.type}
                                languages={result.languages}
                                tags={result.tags}
                            />
                        </div>
                    ) : null}
                </TitledPaper>
            </PageContainer>
        </Dialog>
    );
};

QRCodeScanDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default QRCodeScanDialog;
