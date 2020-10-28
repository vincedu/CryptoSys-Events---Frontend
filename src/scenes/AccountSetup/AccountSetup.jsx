import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

    const { t } = useTranslation();
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
            <TitledPaper title={t('accountSetup.title')}>
                <Grid container spacing={3} justify="center">
                    <Grid item spacing={3} xs={12} md={10}>
                        <Typography variant="subtitle1">{t('accountSetup.description')}</Typography>
                    </Grid>
                    <Grid item spacing={3} sm={12} md={4}>
                        <Typography variant="h6">{t('accountSetup.wallet')}</Typography>
                        <LinkWallet onLinkWalletClick={resetIsShowingWalletLinkError} />
                        <Box hidden={!isShowingWalletLinkError}>
                            <Typography color="error">{t('accountSetup.error')}</Typography>
                        </Box>
                    </Grid>
                    <Grid item spacing={3} sm={12} md={5}>
                        <Typography variant="h6">{t('accountSetup.userInfo')}</Typography>
                        <TextField
                            fullWidth
                            required
                            label={t('accountSetup.displayName')}
                            variant="outlined"
                            name="displayName"
                            value={form.displayName.value}
                            error={form.displayName.error}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid container item xs={12} justify="flex-end">
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ padding: 12 }}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {t('accountSetup.submit')}
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
