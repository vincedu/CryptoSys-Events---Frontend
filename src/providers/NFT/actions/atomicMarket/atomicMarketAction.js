const atomicMarketAction = (actionName, actionData, accountName) => {
    return {
        account: 'atomicmarket',
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

export default atomicMarketAction;
