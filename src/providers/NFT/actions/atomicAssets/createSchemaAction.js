import atomicAssetsAction from './atomicAssetsAction';

const createSchemaAction = (schemaName, collectionName, accountName) => {
    const actionData = {
        authorized_creator: accountName,
        collection_name: collectionName,
        schema_name: schemaName,
        schema_format: [
            {
                name: 'id',
                type: 'uint64',
            },
            {
                name: 'name',
                type: 'string',
            },
            {
                name: 'description',
                type: 'string',
            },
            {
                name: 'price',
                type: 'uint64',
            },
            {
                name: 'startDate',
                type: 'string',
            },
            {
                name: 'endDate',
                type: 'string',
            },
            {
                name: 'eventId',
                type: 'string',
            },
            {
                name: 'eventName',
                type: 'string',
            },
            {
                name: 'img',
                type: 'image',
            },
        ],
    };

    return atomicAssetsAction('createschema', actionData, accountName);
};

export default createSchemaAction;
