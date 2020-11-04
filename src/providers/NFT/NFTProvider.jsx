import React from 'react';
import PropTypes from 'prop-types';
import { TransactionProcessDialog } from '@components';
import { withUAL } from 'ual-reactjs-renderer';
import { AuthContext } from '@providers';
import {
    createCollectionAction,
    createSchemaAction,
    createTemplateAction,
    mintAssetAction,
    announceSaleAction,
    createOfferAction,
} from './actions';

const defaultNFTContext = {
    createEventTickets: () => {},
    transactionQueue: [],
    isLoading: false,
};

export const NFTContext = React.createContext(defaultNFTContext);

const DEFAULT_TRANSACTION_CONFIG = { broadcast: true, blocksBehind: 3, expireSeconds: 30 };

const TEMP_COLLECTION_NAME = 'testcolle113';
const TEMP_SCHEMA_NAME = 'ticket';
const TEMP_MARKETPLACE_NAME = 'testmarket11';

class NFTProvider extends React.Component {
    constructor() {
        super();
        this.state = defaultNFTContext;
    }

    componentDidMount() {
        this.setState({
            createTicketNFTs: async (tickets) => {
                return this.createTicketNFTs(tickets);
            },
            sellTicket: async (assetId, price) => {
                return this.setupAssetSales([
                    {
                        assetId,
                        price,
                    },
                ]);
            },
        });
    }

    componentDidUpdate() {
        if (this.isWalletAuthenticated() && this.shouldExecuteTransactionQueue()) {
            const nextTransaction = this.pollFromTransactionQueue();
            this.signTransaction(nextTransaction);
        }
    }

    createTicketNFTs = async (tickets) => {
        const collectionAction = createCollectionAction(TEMP_COLLECTION_NAME, this.getWalletAccountName());
        const schemaAction = createSchemaAction(TEMP_SCHEMA_NAME, TEMP_COLLECTION_NAME, this.getWalletAccountName());
        const templateActions = tickets.map((template) =>
            createTemplateAction(
                TEMP_SCHEMA_NAME,
                TEMP_COLLECTION_NAME,
                template.maxSupply,
                template.ticketData,
                this.getWalletAccountName(),
            ),
        );

        const transaction = this.createTransactionFromActions([collectionAction, schemaAction, ...templateActions]);

        const transactionResult = await this.transact(transaction);

        const createTemplateActionTraces = transactionResult.transaction.processed.action_traces.filter(
            (actionTrace) => actionTrace.act.name === 'createtempl',
        );
        const ticketTemplates = createTemplateActionTraces.map((actionTrace) => {
            const templateData = actionTrace.inline_traces[0].act.data;
            return {
                templateId: templateData.template_id,
                amount: templateData.max_supply,
                price: templateData.immutable_data.filter((data) => data.key === 'price')[0].value[1],
            };
        });

        const mintAssetsResults = await this.mintAssetsForTemplates(
            TEMP_SCHEMA_NAME,
            TEMP_COLLECTION_NAME,
            ticketTemplates,
        );

        const assetsForSale = mintAssetsResults.transaction.processed.action_traces.map((actionTrace) => {
            const assetData = actionTrace.inline_traces[0].act.data;
            return {
                assetId: assetData.asset_id,
                price: ticketTemplates.filter((template) => template.templateId === assetData.template_id)[0].price,
            };
        });

        await this.setupAssetSales(assetsForSale);
    };

    createCollection = async () => {
        // TODO: Add automatic collection name generation
        const action = createCollectionAction(TEMP_COLLECTION_NAME, this.getWalletAccountName());
        const transaction = this.createTransactionFromActions([action]);
        return this.transact(transaction);
    };

    createSchema = async (collectionName) => {
        // TODO: Add automatic schema name generation
        const action = createSchemaAction(TEMP_SCHEMA_NAME, collectionName, this.getWalletAccountName());
        const transaction = this.createTransactionFromActions([action]);
        return this.transact(transaction);
    };

    createTemplates = async (schemaName, collectionName, ticketTemplates) => {
        const templateActions = ticketTemplates.map((template) =>
            createTemplateAction(
                schemaName,
                collectionName,
                template.maxSupply,
                template.ticketData,
                this.getWalletAccountName(),
            ),
        );

        const transaction = this.createTransactionFromActions(templateActions);
        return this.transact(transaction);
    };

    mintAssetsForTemplates = async (schemaName, collectionName, ticketTemplates) => {
        const mintActions = ticketTemplates.flatMap((ticketTemplate) => {
            const action = mintAssetAction(
                schemaName,
                collectionName,
                ticketTemplate.templateId,
                this.getWalletAccountName(),
            );
            return new Array(ticketTemplate.amount).fill(action);
        });

        const transaction = this.createTransactionFromActions(mintActions);
        return this.transact(transaction);
    };

    setupAssetSales = async (assets) => {
        const actions = assets.flatMap((asset) => {
            const announceSale = announceSaleAction(
                this.getWalletAccountName(),
                [asset.assetId],
                asset.price,
                TEMP_MARKETPLACE_NAME,
            );
            const createOffer = createOfferAction(this.getWalletAccountName(), [asset.assetId]);
            return [announceSale, createOffer];
        });
        const transaction = this.createTransactionFromActions(actions);
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

    getWalletAccountName = () => {
        return this.props.auth.userData.walletAccountName;
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
        const { createTicketNFTs, sellTicket, isLoading } = this.state;
        return (
            <NFTContext.Provider value={{ createTicketNFTs, sellTicket }}>
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
