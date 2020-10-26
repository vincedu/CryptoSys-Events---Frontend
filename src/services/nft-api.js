import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

// Main action call to blockchain

const COLLECTION_NAME = '44miglierina';
const SCHEMA_NAME = 'ticket';
const ATOMIC_MARKET_ACCOUNT = 'atomicmarket';
const SALE_STRING = 'sale';
async function takeAction(action, dataValue) {
    const userName = 'accounttest2'; // Changer en prod ne pas avoir la cle prive ici
    const privateKey = '5KVqJZ4DjKAFJxumLztZczmzRoNC8A9Ko4uv8gySVHxLDwnKnbX'; // Changer en prod ne pas avoir la cle prive ici
    const rpc = new JsonRpc('https://testnet.waxsweden.org', { fetch });
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    // Main call to blockchain after setting action, account_name and data
    console.log(dataValue);
    const resultWithConfig = await api.transact(
        {
            actions: [
                {
                    account: 'atomicassets',
                    name: action,
                    authorization: [
                        {
                            actor: userName,
                            permission: 'active',
                        },
                    ],
                    data: dataValue,
                },
            ],
        },
        {
            blocksBehind: 3,
            expireSeconds: 30,
        },
    );
    return resultWithConfig;
}

class NFTApiService {
    static createCollection(
        userName,
        collectionName,
        allowNotify,
        authorizedAccounts,
        notifyAccounts,
        marketFee,
        data,
    ) {
        const dataValue = {
            author: userName,
            collection_name: collectionName,
            allow_notify: allowNotify,
            authorized_accounts: authorizedAccounts,
            notify_accounts: notifyAccounts,
            market_fee: marketFee,
            data,
        };
        return takeAction('createcol', dataValue);
    }

    static createSchema(userName, collectionName, schemaName, schemaFormat) {
        const dataValue = {
            authorized_creator: userName,
            collection_name: collectionName,
            schema_name: schemaName,
            schema_format: schemaFormat,
        };
        return takeAction('createschema', dataValue);
    }

    static createTemplate(userName, collectionName, schemaName, transferable, burnable, maxSupply, immutableData) {
        const dataValue = {
            authorized_creator: userName,
            collection_name: collectionName,
            schema_name: schemaName,
            transferable,
            burnable,
            max_supply: maxSupply,
            immutable_data: immutableData,
        };
        return takeAction('createtempl', dataValue);
    }

    static mintAsset(
        userName,
        collectionName,
        schemaName,
        templateId,
        newAssetOwner,
        immutableData,
        mutableData,
        tokensToBack,
    ) {
        const dataValue = {
            authorized_minter: userName,
            collection_name: collectionName,
            schema_name: schemaName,
            template_id: templateId,
            new_asset_owner: newAssetOwner,
            immutable_data: immutableData,
            mutable_data: mutableData,
            tokens_to_back: tokensToBack,
        };
        return takeAction('mintasset', dataValue);
    }

    static transfer(from, to, assetsID, memo) {
        const dataValue = {
            from,
            to,
            asset_ids: assetsID,
            memo,
        };
        return takeAction('transfer', dataValue);
    }

    static announceDepo(owner, symbolToAnnounce) {
        const dataValue = {
            owner,
            symbol_to_announce: symbolToAnnounce,
        };
        return takeAction('announcedepo', dataValue);
    }

    static createOffer(sender, recipient, senderAssetsId, recipientAssetsId, memo) {
        const dataValue = {
            sender,
            recipient,
            sender_asset_ids: senderAssetsId,
            recipient_asset_ids: recipientAssetsId,
            memo,
        };
        return takeAction('createoffer', dataValue);
    }
}

export const handleCreateCollection = async () => {
    await NFTApiService.createCollection('accounttest2', COLLECTION_NAME, true, ['accounttest2'], [], 0.05, []);
    console.log('Collection Created');
};

export const handleCreateSchema = async () => {
    await NFTApiService.createSchema('accounttest2', COLLECTION_NAME, SCHEMA_NAME, [
        {
            name: 'id',
            type: 'uint64',
        },
        {
            name: 'name',
            type: 'string',
        },
        {
            name: 'children',
            type: 'uint64[]',
        },
        {
            name: 'description',
            type: 'string',
        },
        {
            name: 'startDate',
            type: 'string',
        },
        {
            name: 'endDate',
            type: 'string',
        },
        {
            name: 'price',
            type: 'uint64',
        },
        {
            name: 'quantity',
            type: 'uint64',
        },
        {
            name: 'eventId',
            type: 'uint64',
        },
        {
            name: 'eventName',
            type: 'string',
        },
        {
            name: 'img',
            type: 'image',
        },
    ]);
};

export const handleCreateTemplate = async (
    name,
    description,
    quantity,
    price,
    startDate,
    endDate,
    eventName,
    image,
) => {
    await NFTApiService.createTemplate('accounttest2', COLLECTION_NAME, SCHEMA_NAME, true, false, quantity, [
        { key: 'eventId', value: ['uint64', 212340] },
        { key: 'price', value: ['uint64', price] },
        { key: 'quantity', value: ['uint64', quantity] },
        { key: 'description', value: ['string', description] },
        { key: 'startDate', value: ['string', startDate.toString()] },
        { key: 'endDate', value: ['string', endDate.toString()] },
        { key: 'name', value: ['string', name] },
        { key: 'eventName', value: ['string', eventName] },
        { key: 'img', value: ['string', image] },
    ]);
};

export const handleMintAsset = async () => {
    await NFTApiService.mintAsset('accounttest2', COLLECTION_NAME, SCHEMA_NAME, 22201, 'accounttest2', [], [], []); // object.processed.action_traces[0].inline_traces[0].data.template_id
};

export const handleCreateOffer = async () => {
    await NFTApiService.createOffer('accounttest2', ATOMIC_MARKET_ACCOUNT, [1099512017467], [], SALE_STRING); // Les 2 dernier parametre vont toujours etre un tableau vide et le mot "sale"
    console.log('Offer Created');
};
