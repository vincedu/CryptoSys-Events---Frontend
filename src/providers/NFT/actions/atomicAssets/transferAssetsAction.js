import atomicAssetsAction from './atomicAssetsAction';

const transferAssetsAction = (from, to, assetIds) => {
    const actionData = {
        from,
        to,
        asset_ids: assetIds,
        memo: '',
    };

    return atomicAssetsAction('transfer', actionData, from);
};

export default transferAssetsAction;
