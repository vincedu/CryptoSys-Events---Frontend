import atomicAssetsTransaction from './atomicAssetsAction';

const mintAssetTransaction = (collectionName, accountName, schemaName, templateId, newAssetOwner) => {
    const actionData = {
        authorized_minter: accountName,
        collection_name: collectionName,
        schema_name: schemaName,
        template_id: templateId,
        new_asset_owner: newAssetOwner,
        immutable_data: [],
        mutable_data: [],
        tokens_to_back: [],
    };

    return atomicAssetsTransaction('mintasset', actionData, accountName);
};

export default mintAssetTransaction;
