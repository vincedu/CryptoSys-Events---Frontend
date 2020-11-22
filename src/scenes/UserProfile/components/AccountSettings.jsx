import React, { useContext } from 'react';
import { TitledPaper, PageContainer } from '@components';
import { useTranslation } from 'react-i18next';
import { Typography, Avatar } from '@material-ui/core';
import firebase from 'firebase';
import { AuthContext } from '@providers';

const AccountSettings = () => {
    const { userData } = useContext(AuthContext);
    const user = firebase.auth().currentUser;
    const { t } = useTranslation();
    return (
        <PageContainer>
            <TitledPaper title={t('accountSettings.information')}>
                <TitledPaper>
                    <Typography variant="h5">{t('accountSettings.photo')}</Typography>
                    <Avatar
                        style={{
                            width: 60,
                            height: 60,
                        }}
                    />
                </TitledPaper>
                <TitledPaper>
                    <Typography variant="h5">{t('accountSettings.name')}</Typography>
                    {userData && userData.displayName ? (
                        <Typography variant="body1">{userData.displayName}</Typography>
                    ) : null}
                </TitledPaper>
                <TitledPaper>
                    <Typography variant="h5">{t('accountSettings.email')}</Typography>
                    {user && user.email ? <Typography variant="body1">{user.email}</Typography> : null}
                </TitledPaper>
                <TitledPaper>
                    <Typography variant="h5">{t('accountSettings.creation')}</Typography>
                    {user && user.metadata.creationTime ? (
                        <Typography variant="body1">{user.metadata.creationTime}</Typography>
                    ) : null}
                </TitledPaper>
                <TitledPaper>
                    <Typography variant="h5">{t('accountSettings.wallet')}</Typography>
                    {userData && userData.walletAccountName ? (
                        <Typography variant="body1">{userData.walletAccountName}</Typography>
                    ) : null}
                </TitledPaper>
            </TitledPaper>
        </PageContainer>
    );
};

export default AccountSettings;
