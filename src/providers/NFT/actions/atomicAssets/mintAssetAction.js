import atomicAssetsAction from './atomicAssetsAction';

const mintAssetAction = (schemaName, collectionName, templateId, accountName) => {
    const actionData = {
        authorized_minter: accountName,
        collection_name: collectionName,
        schema_name: schemaName,
        template_id: templateId,
        new_asset_owner: accountName,
        immutable_data: [],
        mutable_data: [
            { key: 'opened', value: ['uint8', 0] },
            { key: 'used', value: ['uint8', 0] },
        ],
        tokens_to_back: [],
    };

    return atomicAssetsAction('mintasset', actionData, accountName);
};

export default mintAssetAction;
