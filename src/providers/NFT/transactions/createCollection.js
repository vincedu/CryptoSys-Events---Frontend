import atomicAssetsTransaction from './atomicAssets';

const createCollectionTransaction = (collectionName, accountName) => {
    const actionData = {
        author: accountName,
        collection_name: collectionName,
        allow_notify: true,
        authorized_accounts: [accountName],
        notify_accounts: [],
        market_fee: 0.05,
        data: [],
    };

    return atomicAssetsTransaction('createcol', actionData, accountName);
};

export default createCollectionTransaction;
