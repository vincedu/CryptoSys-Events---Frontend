import atomicAssetsAction from './atomicAssetsAction';

const setAssetDataAction = (assetId, newMutableTicketData, accountName) => {
    const actionData = {
        authorized_editor: accountName,
        asset_owner: accountName,
        asset_id: assetId,
        new_mutable_data: [
            { key: 'opened', value: ['uint8', newMutableTicketData.opened ? 1 : 0] },
            { key: 'used', value: ['uint8', newMutableTicketData.used ? 1 : 0] },
        ],
    };

    return atomicAssetsAction('setassetdata', actionData, accountName);
};

export default setAssetDataAction;
