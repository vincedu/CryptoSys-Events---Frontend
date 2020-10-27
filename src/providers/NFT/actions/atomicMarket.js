const atomicMarketTransaction = (actionName, actionData, accountName) => {
    return {
        actions: [
            {
                account: 'atomicmarket',
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

export default atomicMarketTransaction;
