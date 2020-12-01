import React, { useContext } from 'react';
import { TitledPaper, PageContainer } from '@components';
import { useTranslation } from 'react-i18next';
import { Typography, Avatar } from '@material-ui/core';
import firebase from 'firebase';
import moment from 'moment';
import { AuthContext } from '@providers';

const AccountSettings = () => {
    const { userData } = useContext(AuthContext);
    const user = firebase.auth().currentUser;
    const { t } = useTranslation();
    return (
        <PageContainer>
            <TitledPaper title={t('accountSettings.information')}>
                <TitledPaper>
                    <div style={{ display: 'flex' }}>
                        <Avatar style={{ width: 60, height: 60 }} />
                        <div style={{ marginLeft: 15 }}>
                            {userData?.displayName ? (
                                <Typography variant="h5">{userData.displayName}</Typography>
                            ) : null}
                            {user?.email ? <Typography variant="body1">{user.email}</Typography> : null}
                        </div>
                    </div>
                </TitledPaper>
                <TitledPaper>
                    {user?.metadata?.creationTime ? (
                        <Typography variant="body1">{`${t('accountSettings.creation')} ${moment(
                            user.metadata.creationTime,
                        ).format('yyyy-MM-DD HH:mm')}`}</Typography>
                    ) : null}
                </TitledPaper>
                <TitledPaper>
                    <Typography variant="h5">{t('accountSettings.wallet')}</Typography>
                    {userData?.walletAccountName ? (
                        <Typography variant="body1">{userData.walletAccountName}</Typography>
                    ) : null}
                </TitledPaper>
            </TitledPaper>
        </PageContainer>
    );
};
AccountSettings.propTypes = {};

export default AccountSettings;
