const eosioTokenAction = (actionName, actionData, accountName) => {
    return {
        account: 'eosio.token',
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

export default eosioTokenAction;
