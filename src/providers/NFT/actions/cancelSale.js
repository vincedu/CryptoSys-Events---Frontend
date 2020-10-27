import atomicMarketTransaction from './atomicAssetsAction';

const cancelSaleTransaction = (saleId) => {
    const actionData = {
        sale_id: saleId,
    };

    return atomicMarketTransaction('cancelsale', actionData);
};

export default cancelSaleTransaction;
