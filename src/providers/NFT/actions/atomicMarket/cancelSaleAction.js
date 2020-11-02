import atomicMarketAction from './atomicMarketAction';

const cancelSaleAction = (saleId) => {
    const actionData = {
        sale_id: saleId,
    };

    return atomicMarketAction('cancelsale', actionData);
};

export default cancelSaleAction;
