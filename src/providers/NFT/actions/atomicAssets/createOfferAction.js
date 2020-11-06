import atomicAssetsAction from './atomicAssetsAction';

const SALE_STRING = 'sale';
const ATOMIC_MARKET_ACCOUNT = 'atomicmarket';
const createOfferAction = (sender, senderAssetIds) => {
    const actionData = {
        sender,
        recipient: ATOMIC_MARKET_ACCOUNT,
        sender_asset_ids: senderAssetIds,
        recipient_asset_ids: [],
        memo: SALE_STRING,
    };

    return atomicAssetsAction('createoffer', actionData, sender);
};

export default createOfferAction;
