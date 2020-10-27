import atomicMarketTransaction from './atomicAssetsAction';

const INTENDED_DELPHI_MEDIAN = 0;
const purchaseSaleTransaction = (buyer, saleId, marketplaceNAme) => {
    const actionData = {
        buyer,
        sale_id: saleId,
        intended_delphi_median: INTENDED_DELPHI_MEDIAN,
        taker_marketplace: marketplaceNAme,
    };

    return atomicMarketTransaction('purchasesale', actionData);
};

export default purchaseSaleTransaction;
