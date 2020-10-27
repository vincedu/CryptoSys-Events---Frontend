import atomicMarketTransaction from './atomicAssetsAction';

const WAX_SETTLEMENT_SYMBOL = '8,WAX';
const createMarketplaceTransaction = (seller, assetIds, price, marketplaceName) => {
    const actionData = {
        seller,
        asset_ids: assetIds,
        listing_price: price,
        settlement_symbol: WAX_SETTLEMENT_SYMBOL,
        maker_marketplace: marketplaceName,
    };

    return atomicMarketTransaction('announcesale', actionData);
};

export default createMarketplaceTransaction;
