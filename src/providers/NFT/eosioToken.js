const eosioTokenTransaction = (actionName, actionData, accountName) => {
    return {
        actions: [
            {
                account: 'eosio.token',
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

export default eosioTokenTransaction;
