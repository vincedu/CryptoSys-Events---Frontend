import atomicAssetsAction from './atomicAssetsAction';

const createCollectionAction = (collectionName, accountName) => {
    const actionData = {
        author: accountName,
        collection_name: collectionName,
        allow_notify: true,
        authorized_accounts: [accountName],
        notify_accounts: [],
        market_fee: 0.05,
        data: [],
    };

    return atomicAssetsAction('createcol', actionData, accountName);
};

export default createCollectionAction;
