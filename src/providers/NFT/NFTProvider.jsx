import React from 'react';
import PropTypes from 'prop-types';
import { TransactionProcessDialog } from '@components';
import { withUAL } from 'ual-reactjs-renderer';
import { AuthContext } from '@providers';
import { createCollectionAction, createSchemaAction, createTemplateAction } from './actions';

const defaultNFTContext = {
    createEventTickets: () => {},
    transactionQueue: [],
    isLoading: false,
};

export const NFTContext = React.createContext(defaultNFTContext);

const DEFAULT_TRANSACTION_CONFIG = { broadcast: true, blocksBehind: 3, expireSeconds: 30 };

const TEMP_COLLECTION_NAME = 'testcollec24';
const TEMP_SCHEMA_NAME = 'ticket';

class NFTProvider extends React.Component {
    constructor() {
        super();
        this.state = defaultNFTContext;
    }

    componentDidMount() {
        this.setState({
            createTicketNFTs: async (tickets) => {
                const createCollectionResult = await this.createCollection();
                const collectionName = createCollectionResult.transaction.transaction.actions[0].data.collection_name;
                const createSchemaResult = await this.createSchema(collectionName);
                const schemaName = createSchemaResult.transaction.transaction.actions[0].data.schema_name;

                const templateIds = await Promise.all(
                    tickets.map(async (ticket) => {
                        const createTemplateResult = await this.createTemplate(
                            schemaName,
                            collectionName,
                            ticket.ticketData,
                            ticket.maxSupply,
                        );

                        const templateId =
                            createTemplateResult.transaction.processed.action_traces[0].inline_traces[0].act.data
                                .template_id;

                        return templateId;
                    }),
                );

                console.log('templateIds', templateIds);
            },
        });
    }

    componentDidUpdate() {
        if (this.isWalletAuthenticated() && this.shouldExecuteTransactionQueue()) {
            const nextTransaction = this.pollFromTransactionQueue();
            this.signTransaction(nextTransaction);
        }
    }

    createCollection = async () => {
        // TODO: Add automatic collection name generation
        const action = createCollectionAction(TEMP_COLLECTION_NAME, this.props.auth.userData.walletAccountName);
        const transaction = this.createTransactionFromActions([action]);
        return this.transact(transaction);
    };

    createSchema = async (collectionName) => {
        // TODO: Add automatic schema name generation
        const action = createSchemaAction(TEMP_SCHEMA_NAME, collectionName, this.props.auth.userData.walletAccountName);
        const transaction = this.createTransactionFromActions([action]);
        return this.transact(transaction);
    };

    createTemplate = async (schemaName, collectionName, templateData, maxSupply) => {
        const action = createTemplateAction(
            schemaName,
            collectionName,
            maxSupply,
            templateData,
            this.props.auth.userData.walletAccountName,
        );

        const transaction = this.createTransactionFromActions([action]);
        return this.transact(transaction);
    };

    createTransactionFromActions = (actions) => {
        return {
            actions,
        };
    };

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
                .then((result) => {
                    console.log('transaction result', result);
                    transaction.resolve(result);
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
        const { createTicketNFTs, isLoading } = this.state;
        return (
            <NFTContext.Provider value={{ createTicketNFTs }}>
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
