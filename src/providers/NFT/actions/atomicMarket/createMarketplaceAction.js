import atomicMarketAction from './atomicMarketAction';

const createMarketplaceAction = (creator, marketplaceName) => {
    const actionData = {
        creator,
        marketplace_name: marketplaceName,
    };

    return atomicMarketAction('regmarket', actionData);
};

export default createMarketplaceAction;
