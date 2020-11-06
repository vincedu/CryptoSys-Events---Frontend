const atomicAssetsAction = (actionName, actionData, accountName) => {
    return {
        account: 'atomicassets',
        name: actionName,
        authorization: [
            {
                actor: accountName,
                permission: 'active',
            },
        ],
        data: actionData,
    };
};

export default atomicAssetsAction;
