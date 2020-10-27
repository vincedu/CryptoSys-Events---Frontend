import eosioTokenTransaction from './atomicAssetsAction';

const DEPOSIT_STRING = 'deposit';
const ATOMIC_MARKET_ACCOUNT = 'atomicmarket';
const depositTokenTransaction = (from, quantity) => {
    const actionData = {
        from,
        to: ATOMIC_MARKET_ACCOUNT,
        quantity,
        memo: DEPOSIT_STRING,
    };

    return eosioTokenTransaction('transfer', actionData);
};

export default depositTokenTransaction;
