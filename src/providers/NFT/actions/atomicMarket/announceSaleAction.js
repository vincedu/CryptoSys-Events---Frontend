import atomicMarketAction from './atomicMarketAction';

const WAX_SETTLEMENT_SYMBOL = '8,WAX';
const WAX_UNIT = 'WAX';

const announceSaleAction = (seller, assetIds, price, marketplaceName) => {
    const actionData = {
        seller,
        asset_ids: assetIds,
        listing_price: `${price.toFixed(8)} ${WAX_UNIT}`,
        settlement_symbol: WAX_SETTLEMENT_SYMBOL,
        maker_marketplace: marketplaceName,
    };

    return atomicMarketAction('announcesale', actionData, seller);
};

export default announceSaleAction;
