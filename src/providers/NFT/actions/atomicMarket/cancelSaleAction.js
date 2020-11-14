import atomicMarketAction from './atomicMarketAction';

const cancelSaleAction = (seller, saleId) => {
    const actionData = {
        sale_id: saleId,
    };

    return atomicMarketAction('cancelsale', actionData, seller);
};

export default cancelSaleAction;
