import eosioTokenAction from './eosioTokenAction';

const DEPOSIT_STRING = 'deposit';
const ATOMIC_MARKET_ACCOUNT = 'atomicmarket';
const depositTokenAction = (from, quantity) => {
    const actionData = {
        from,
        to: ATOMIC_MARKET_ACCOUNT,
        quantity,
        memo: DEPOSIT_STRING,
    };

    return eosioTokenAction('transfer', actionData, from);
};

export default depositTokenAction;
