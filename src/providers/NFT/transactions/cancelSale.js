import atomicMarketTransaction from './atomicAssets';

const cancelSaleTransaction = (saleId) => {
    const actionData = {
        sale_id: saleId,
    };

    return atomicMarketTransaction('cancelsale', actionData);
};

export default cancelSaleTransaction;
