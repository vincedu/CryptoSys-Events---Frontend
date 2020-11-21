import atomicAssetsAction from './atomicAssetsAction';

const createTemplateAction = (schemaName, collectionName, maxSupply, templateData, accountName) => {
    const actionData = {
        authorized_creator: accountName,
        collection_name: collectionName,
        schema_name: schemaName,
        transferable: true,
        burnable: true,
        max_supply: maxSupply,
        immutable_data: [
            { key: 'name', value: ['string', templateData.name] },
            { key: 'description', value: ['string', templateData.description] },
            { key: 'eventId', value: ['string', templateData.eventId] },
            { key: 'img', value: ['string', templateData.image] },
        ],
    };

    return atomicAssetsAction('createtempl', actionData, accountName);
};

export default createTemplateAction;
