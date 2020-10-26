import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

// Main action call to blockchain
const ATOMIC_MARKET_ACCOUNT = 'atomicmarket';
const DEPOSIT_STRING = 'deposit';
async function takeAction(action, dataValue) {
    const userName = 'accounttest4'; // Changer en prod ne pas avoir la cle prive ici
    const privateKey = '5KF3N2EPZFkpZhhSAPDmua2UBXHpjJWQKaAvue9gQxb3pHmJ1gP'; // Changer en prod ne pas avoir la cle prive ici
    const rpc = new JsonRpc('https://testnet.waxsweden.org', { fetch });
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    // Main call to blockchain after setting action, account_name and data
    console.log(dataValue);
    const resultWithConfig = await api.transact(
        {
            actions: [
                {
                    account: 'eosio.token',
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

class TransferTokenService {
    static deposit(from, to, quantity, memo) {
        const dataValue = {
            // eslint-disable-next-line object-shorthand
            from,
            to,
            quantity,
            memo,
        };
        return takeAction('transfer', dataValue);
    }
}

export const handleDeposit = async () => {
    await TransferTokenService.deposit('accounttest4', ATOMIC_MARKET_ACCOUNT, '1.00000000 WAX', DEPOSIT_STRING);
    console.log('Deposit to Balance done');
};

export default TransferTokenService;
