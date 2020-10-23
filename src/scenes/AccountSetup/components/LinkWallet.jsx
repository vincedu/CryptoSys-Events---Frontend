import React, { useState, useEffect } from 'react';
import { withUAL } from 'ual-reactjs-renderer';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { CenteredCircularProgress } from '@components';

const useStyles = makeStyles((theme) => ({
    walletButtonIcon: {
        marginRight: theme.spacing(1),
    },
}));

const LinkWallet = (props) => {
    const classes = useStyles();
    const { ual, onLinkWalletClick } = props;
    const [walletAccountName, setWalletAccountName] = useState(undefined);
    const [isLoadingAccountName, setIsLoadingAccountName] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (isMounted && ual.activeUser) {
            setIsLoadingAccountName(true);
            ual.activeUser.getAccountName().then((accountName) => {
                if (isMounted) {
                    setWalletAccountName(accountName);
                    setIsLoadingAccountName(false);
                }
            });
        }
        return () => {
            isMounted = false;
        };
    }, [ual.activeUser]);

    const handleLinkWalletButtonClick = () => {
        onLinkWalletClick();
        ual.showModal();
    };

    if ((ual.activeAuthenticator && ual.activeAuthenticator.isLoading()) || isLoadingAccountName) {
        return <CenteredCircularProgress />;
    }

    return ual.activeUser && ual.activeAuthenticator ? (
        <>
            <Typography display="inline" variant="body2">
                Linked to:{' '}
            </Typography>
            <Typography display="inline" variant="subtitle2">
                {walletAccountName}
            </Typography>
            <Typography variant="body2">Not your wallet?</Typography>
            <Button variant="contained" onClick={ual.logout}>
                Unlink Wallet
            </Button>
        </>
    ) : (
        <Button variant="contained" color="primary" onClick={handleLinkWalletButtonClick}>
            <AccountBalanceWalletIcon className={classes.walletButtonIcon} />
            Link account to a wallet
        </Button>
    );
};

LinkWallet.propTypes = {
    ual: PropTypes.object.isRequired,
    onLinkWalletClick: PropTypes.func.isRequired,
};

export default withUAL(LinkWallet);
