import { Anchor } from 'ual-anchor';
import { Wax } from '@eosdacio/ual-wax';
import { JsonRpc } from 'eosjs';

const WAX_CHAIN = {
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    rpcEndpoints: [
        {
            protocol: 'https',
            host: 'chain.wax.io',
            port: 443,
        },
    ],
};

const WAX_TESTNET_CHAIN = {
    chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
    rpcEndpoints: [
        {
            protocol: 'https',
            host: 'testnet.waxsweden.org',
            port: 59676,
        },
    ],
};

export const APP_NAME = 'EOSEvents';

const anchor = new Anchor([WAX_CHAIN], {
    appName: APP_NAME,
    rpc: new JsonRpc('https://chain.wax.io/'),
});

const anchorTestnet = new Anchor([WAX_TESTNET_CHAIN], {
    appName: APP_NAME,
    rpc: new JsonRpc('https://testnet.waxsweden.org/'),
});

const waxCloudWallet = new Wax([WAX_CHAIN]);

const isTestNet = process.env.REACT_APP_EOS_NET === 'test' || process.env.NODE_ENV === 'development';

export const chains = isTestNet ? [WAX_TESTNET_CHAIN] : [WAX_CHAIN];

export const authenticators = isTestNet ? [anchorTestnet] : [anchor, waxCloudWallet];
