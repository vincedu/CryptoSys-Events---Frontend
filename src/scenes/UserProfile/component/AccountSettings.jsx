import React, { useContext } from 'react';
import { TitledPaper, PageContainer } from '@components';
import { Typography, Avatar } from '@material-ui/core';
import firebase from 'firebase';
import { AuthContext } from '@providers';

const AccountSettings = () => {
    const { userData } = useContext(AuthContext);
    const user = firebase.auth().currentUser;
    return (
        <PageContainer title="Account Informations">
            <TitledPaper>
                <Typography variant="h5">Account Name</Typography>
                {userData && userData.displayName ? (
                    <Typography variant="body">{userData.displayName}</Typography>
                ) : null}
            </TitledPaper>
            <TitledPaper>
                <Typography variant="h5">Account Email Address</Typography>
                {user && user.email ? <Typography variant="body">{user.email}</Typography> : null}
            </TitledPaper>
            <TitledPaper>
                <Typography variant="h5">Profile Photo</Typography>
                <Avatar
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />
            </TitledPaper>
            <TitledPaper>
                <Typography variant="h5">Account Creation Time</Typography>
                {user && user.metadata.creationTime ? (
                    <Typography variant="body">{user.metadata.creationTime}</Typography>
                ) : null}
            </TitledPaper>
            <TitledPaper>
                <Typography variant="h5">Linked Wallet Account</Typography>
                {userData && userData.walletAccountName ? (
                    <Typography variant="body">{userData.walletAccountName}</Typography>
                ) : null}
            </TitledPaper>
        </PageContainer>
    );
};

export default AccountSettings;
