import atomicMarketTransaction from './atomicAssetsAction';

const createMarketplaceTransaction = (creator, marketplaceName) => {
    const actionData = {
        creator,
        marketplace_name: marketplaceName,
    };

    return atomicMarketTransaction('regmarket', actionData);
};

export default createMarketplaceTransaction;
