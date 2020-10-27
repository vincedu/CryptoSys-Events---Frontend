import atomicAssetsTransaction from './atomicAssetsAction';

const SALE_STRING = 'sale';
const ATOMIC_MARKET_ACCOUNT = 'atomicmarket';
const createOfferTransaction = (sender, senderAssetsId) => {
    const actionData = {
        sender,
        recipient: ATOMIC_MARKET_ACCOUNT,
        sender_asset_ids: senderAssetsId,
        recipient_asset_ids: [],
        memo: SALE_STRING,
    };

    return atomicAssetsTransaction('createoffer', actionData);
};

export default createOfferTransaction;
