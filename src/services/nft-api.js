import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

// Main action call to blockchain
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
    console.log("allos");
    console.log(resultWithConfig)
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

    static createTemplate(userName, collectionName,schemaName, transferable, burnable, maxSupply, immutableData ) {
        const dataValue = {
            authorized_creator: userName,
            collection_name: collectionName,
            schema_name: schemaName,
            transferable: transferable,
            burnable: burnable,
            max_supply : maxSupply,
            immutable_data : immutableData
        };
        return takeAction("createtempl", dataValue);
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
}

export const handleCreateCollection = () => {
        NFTApiService.createCollection('accounttest2', 'evenko123455', true, ['accounttest2'], [], 0.05, []);
        // this.props.setUser(this.state.input);
        // this.setState({ input: '' });
    };

export const handleCreateSchema = () => {
        NFTApiService.createSchema('accounttest2', 'evenko123455', 'ticket', [
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
                type:'string',
            },
            {
                name: 'startDate',
                type:'string', 
            },
            {
                name: 'endDate',
                type:'string'
            },
            {   
                name :'price',
                type:'uint64'
            },
            {
                name:'quantity',
                type:'uint64'
            },
            {
                name:'eventId',
                type:'uint64'   
            },
            {
                name:'eventName',
                type:'string',  
            }
        ]);
    };
   
export const handleCreateTemplate = () => {
        NFTApiService.createTemplate('accounttest2', 'evenko123455', "ticket",true, false,1, [{"key":"eventId","value":["uint64", 1]},{"key": "price","value":["uint64",1]}]);
    };

export const handleMintAsset = () => {
        console.log("allresulto")
        NFTApiService.mintAsset('accounttest2', 'evenko123455', 'ticket', 21082, 'accounttest2', [], [], []);//object.processed.action_traces[0].inline_traces[0].data.template_id
    };

export default NFTApiService;
