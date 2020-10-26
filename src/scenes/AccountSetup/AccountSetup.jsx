import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withUAL } from 'ual-reactjs-renderer';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { SET_USER_DATA_MUTATION } from '@graphql/mutations';
import { TitledPaper, PageContainer } from '@components';
import { AuthContext } from '@providers';
import LinkWallet from './components/LinkWallet';

const DEFAULT_FORM = {
    displayName: {
        value: '',
        error: false,
    },
};

const AccountSetup = (props) => {
    const { ual, redirectPath } = props;

    const history = useHistory();
    const [form, setForm] = useState(DEFAULT_FORM);
    const [isShowingWalletLinkError, setIsShowingWalletLinkError] = useState(false);

    const [setUserData] = useMutation(SET_USER_DATA_MUTATION);
    const authContext = useContext(AuthContext);

    const isValueValid = (value) => {
        return value !== '';
    };

    const mapFormToAccountData = () => {
        const accountData = {};
        Object.keys(form).forEach((key) => {
            accountData[key] = form[key].value;
        });

        return accountData;
    };

    const resetIsShowingWalletLinkError = () => {
        setIsShowingWalletLinkError(false);
    };

    const updateIsShowingWalletLinkError = () => {
        setIsShowingWalletLinkError(!ual.activeUser);
    };

    const updateFormErrors = () => {
        const updatedForm = {};
        Object.keys(form).forEach((key) => {
            updatedForm[key] = {
                value: form[key].value,
                error: !isValueValid(form[key].value),
            };
        });
        setForm(updatedForm);
    };

    const isFormValid = () => {
        let isValid = true;

        Object.values(form).forEach((value) => {
            if (value.error || !isValueValid(value.value)) {
                isValid = false;
            }
        });

        return isValid;
    };

    const handleFormChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setForm({
            ...form,
            [inputName]: {
                value: inputValue,
                error: !isValueValid(inputValue),
            },
        });
    };

    const handleSubmit = async () => {
        if (isFormValid && ual.activeUser) {
            const accountData = mapFormToAccountData();
            accountData.walletAccountName = await ual.activeUser.getAccountName();
            accountData.walletAuthType = await ual.activeAuthenticator.getName();
            setUserData({ variables: { input: accountData } }).then(() => {
                authContext.setUserData(accountData);
                history.push(redirectPath);
            });
        } else {
            updateFormErrors();
            updateIsShowingWalletLinkError();
        }
    };

    return (
        <PageContainer>
            <TitledPaper title="Setup your account">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            Before you get started with your account, we will need a little more information about you.
                        </Typography>
                    </Grid>
                    <Grid container item spacing={3} xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h6">User information</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Display Name"
                                variant="outlined"
                                name="displayName"
                                value={form.displayName.value}
                                error={form.displayName.error}
                                onChange={handleFormChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3} xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Wallet</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LinkWallet onLinkWalletClick={resetIsShowingWalletLinkError} />
                            <Box hidden={!isShowingWalletLinkError}>
                                <Typography color="error">*You need to link a wallet to your account</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} justify="flex-end">
                        <Button variant="contained" color="secondary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </TitledPaper>
        </PageContainer>
    );
};

AccountSetup.propTypes = {
    ual: PropTypes.object.isRequired,
    redirectPath: PropTypes.string,
};

AccountSetup.defaultProps = {
    redirectPath: '/',
};

export default withUAL(AccountSetup);
