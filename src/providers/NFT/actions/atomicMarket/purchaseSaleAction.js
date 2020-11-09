import atomicMarketAction from './atomicMarketAction';

const INTENDED_DELPHI_MEDIAN = 0;
const purchaseSaleAction = (buyer, saleId, marketplaceNAme) => {
    const actionData = {
        buyer,
        sale_id: saleId,
        intended_delphi_median: INTENDED_DELPHI_MEDIAN,
        taker_marketplace: marketplaceNAme,
    };

    return atomicMarketAction('purchasesale', actionData, buyer);
};

export default purchaseSaleAction;
