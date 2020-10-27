import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

// Main action call to blockchain
const MARKETPLACE_NAME = 'testmarket11';
const ACCOUNT_SELLING = 'accounttest2';
const ACCOUNT_BUYIN = 'accounttest4';
const WAX_SETTLEMENT_SYMBOL = '8,WAX';

async function takeAction(action, dataValue) {
    const userName = 'accounttest4'; // Changer en prod ne pas avoir la cle prive ici
    const privateKey = '5KF3N2EPZFkpZhhSAPDmua2UBXHpjJWQKaAvue9gQxb3pHmJ1gP'; // Changer en prod ne pas avoir la cle prive ici
    const rpc = new JsonRpc('https://testnet.waxsweden.org', { fetch });
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    // Main call to blockchain after setting action, account_name and data
    const resultWithConfig = await api.transact(
        {
            actions: [
                {
                    account: 'atomicmarket',
                    name: action,
                    authorization: [
                        {
                            actor: userName,
                            permission: 'active',
                        },
                    ],
                    data: dataValue,
                },
            ],
        },
        {
            blocksBehind: 3,
            expireSeconds: 30,
        },
    );
    return resultWithConfig;
}

class MarketplaceApiService {
    static createMarketplace(creator, marketplaceName) {
        const dataValue = { creator, marketplace_name: marketplaceName };
        return takeAction('regmarket', dataValue);
    }

    static announceSale(seller, assetIds, price, settlementSymbol, marketplaceName) {
        const dataValue = {
            seller,
            asset_ids: assetIds,
            listing_price: price,
            settlement_symbol: settlementSymbol,
            maker_marketplace: marketplaceName,
        };
        return takeAction('announcesale', dataValue);
    }

    static cancelSale(saleId) {
        const dataValue = { sale_id: saleId };
        return takeAction('cancelsale', dataValue);
    }

    static purchaseSale(buyer, saleId, delphiMedian, marketplaceNAme) {
        const dataValue = {
            buyer,
            sale_id: saleId,
            intended_delphi_median: delphiMedian,
            taker_marketplace: marketplaceNAme,
        };
        return takeAction('purchasesale', dataValue);
    }

    // todo : lire delphi doc
    static addDelphi(quantities, owner) {
        const dataValue = { owner, quantities };
        return takeAction('balances', dataValue);
    }
}

export const handleCreateMarketPlace = async () => {
    await MarketplaceApiService.createMarketplace(ACCOUNT_SELLING, MARKETPLACE_NAME);
    console.log('MarketPlace Created');
};

export const handleAnnounceSale = async () => {
    await MarketplaceApiService.announceSale(
        ACCOUNT_SELLING,
        [1099512018975],
        '1.00000000 WAX',
        WAX_SETTLEMENT_SYMBOL,
        MARKETPLACE_NAME,
    );
    console.log('Sale announced !');
};

export const handlePurchaseSale = async () => {
    await MarketplaceApiService.purchaseSale(ACCOUNT_BUYIN, 21242, 0, MARKETPLACE_NAME); // mettre sale Id dans le tableau
    console.log('Sale PURCHASE !');
};

export const handleCancelSale = async () => {
    await MarketplaceApiService.cancelSale([21242]); // mettre sale Id dans le tableau
    console.log('Sale Cancel !');
};

export default MarketplaceApiService;
