const atomicAssetsTransaction = (actionName, actionData, accountName) => {
    return {
        actions: [
            {
                account: 'atomicassets',
                name: actionName,
                authorization: [
                    {
                        actor: accountName,
                        permission: 'active',
                    },
                ],
                data: actionData,
            },
        ],
    };
};

export default atomicAssetsTransaction;
