import React from 'react';
import PropTypes from 'prop-types';
import { TransactionProcessDialog } from '@components';
import { withUAL } from 'ual-reactjs-renderer';
import { AuthContext } from '@providers';
import { createCollectionTransaction, createSchemaTransaction, createTemplateTransaction } from './transactions';

const defaultNFTContext = {
    createCollection: () => {},
    createSchema: () => {},
    createTemplate: () => {},
    transactionQueue: [],
    isLoading: false,
};

export const NFTContext = React.createContext(defaultNFTContext);

const DEFAULT_TRANSACTION_CONFIG = { broadcast: true, blocksBehind: 3, expireSeconds: 30 };

class NFTProvider extends React.Component {
    constructor() {
        super();
        this.state = defaultNFTContext;
    }

    componentDidMount() {
        this.setState({
            createCollection: async () => {
                // TODO: Add automatic collection name generation
                const transaction = createCollectionTransaction(
                    'testcollec13',
                    this.props.auth.userData.walletAccountName,
                );
                return this.transact(transaction);
            },
            createSchema: async () => {
                // TODO: Add automatic schema name generation
                const transaction = createSchemaTransaction(
                    'ticket',
                    'testcollec13',
                    this.props.auth.userData.walletAccountName,
                );
                return this.transact(transaction);
            },
            createTemplate: async (templateData, maxSupply) => {
                const transaction = createTemplateTransaction(
                    'ticket',
                    'testcollec13',
                    maxSupply,
                    templateData,
                    this.props.auth.userData.walletAccountName,
                );
                return this.transact(transaction);
            },
        });
    }

    componentDidUpdate() {
        if (this.isWalletAuthenticated() && this.shouldExecuteTransactionQueue()) {
            const nextTransaction = this.pollFromTransactionQueue();
            this.signTransaction(nextTransaction);
        }
    }

    shouldExecuteTransactionQueue = () => {
        return this.state.transactionQueue.length > 0 && !this.state.isLoading;
    };

    addToTransactionQueue = (transaction) => {
        this.setState((prevState) => ({ transactionQueue: [...prevState.transactionQueue, transaction] }));
    };

    pollFromTransactionQueue = () => {
        this.setState((prevState) => {
            const queue = [...prevState.transactionQueue];
            queue.shift();
            return {
                transactionQueue: queue,
            };
        });

        return this.state.transactionQueue[0];
    };

    setIsLoading = (isLoading) => {
        this.setState({ isLoading });
    };

    handleCloseDialog = () => {
        this.setIsLoading(false);
    };

    isWalletAuthenticated = () => {
        return !!this.props.ual.activeUser;
    };

    getAuthenticatorWithAuthType = (authType) => {
        const foundAuthenticators = this.props.ual.availableAuthenticators.filter(
            (authenticator) => authenticator.getName() === authType,
        );
        return foundAuthenticators[0];
    };

    authenticateWallet = async () => {
        const { ual, auth } = this.props;

        return new Promise((resolve, reject) => {
            this.setIsLoading(true);
            ual.submitAccountForLogin(
                auth.userData.walletAccountName,
                this.getAuthenticatorWithAuthType(auth.userData.walletAuthType),
            )
                .then(() => {
                    this.setIsLoading(false);
                    resolve();
                })
                .catch(() => {
                    this.setIsLoading(false);
                    reject();
                });
        });
    };

    transact = async (transaction) => {
        if (!this.isWalletAuthenticated()) {
            await this.authenticateWallet();
        }

        return new Promise((resolve, reject) => {
            const transactionWithPromise = {
                transaction,
                resolve,
                reject,
            };

            this.addToTransactionQueue(transactionWithPromise);
        });
    };

    signTransaction = (transaction) => {
        const { ual } = this.props;
        if (this.isWalletAuthenticated()) {
            this.setIsLoading(true);
            ual.activeUser
                .signTransaction(transaction.transaction, DEFAULT_TRANSACTION_CONFIG)
                .then(() => {
                    transaction.resolve();
                    this.setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    transaction.reject();
                    this.setIsLoading(false);
                });
        }
    };

    render() {
        const { children } = this.props;
        const { createCollection, createSchema, createTemplate, isLoading } = this.state;
        return (
            <NFTContext.Provider value={{ createCollection, createSchema, createTemplate }}>
                {children}
                <TransactionProcessDialog open={isLoading} onClose={this.handleCloseDialog} />
            </NFTContext.Provider>
        );
    }
}

NFTProvider.propTypes = {
    children: PropTypes.node.isRequired,
    auth: PropTypes.object.isRequired,
    ual: PropTypes.object.isRequired,
};

const NFTProviderWithAuth = (props) => {
    return (
        <AuthContext.Consumer>
            {(context) => (
                <NFTProvider ual={props.ual} auth={context}>
                    {props.children}
                </NFTProvider>
            )}
        </AuthContext.Consumer>
    );
};

NFTProviderWithAuth.propTypes = {
    children: PropTypes.node.isRequired,
    ual: PropTypes.object.isRequired,
};

export default withUAL(NFTProviderWithAuth);
