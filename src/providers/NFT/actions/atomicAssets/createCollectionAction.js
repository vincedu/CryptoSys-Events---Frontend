import { RESALE_COMMISSION } from '@constants/ticket';
import atomicAssetsAction from './atomicAssetsAction';

const createCollectionAction = (collectionName, accountName) => {
    const actionData = {
        author: accountName,
        collection_name: collectionName,
        allow_notify: true,
        authorized_accounts: [accountName],
        notify_accounts: [],
        market_fee: RESALE_COMMISSION,
        data: [],
    };

    return atomicAssetsAction('createcol', actionData, accountName);
};

export default createCollectionAction;
