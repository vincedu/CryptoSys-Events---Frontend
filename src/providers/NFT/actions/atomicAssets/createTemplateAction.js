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
            { key: 'price', value: ['uint64', templateData.price] },
            { key: 'startDate', value: ['string', templateData.startDate] },
            { key: 'endDate', value: ['string', templateData.endDate] },
            { key: 'eventId', value: ['string', templateData.eventId] },
            { key: 'eventName', value: ['string', templateData.eventName] },
            { key: 'img', value: ['string', templateData.image] },
        ],
    };

    return atomicAssetsAction('createtempl', actionData, accountName);
};

export default createTemplateAction;
