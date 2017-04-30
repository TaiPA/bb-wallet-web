/**
 * API Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import AppConfig from './Config';

const ETH_BASE_URL = `https://${(AppConfig.TESTNET) ? 'ropsten' : 'api'}.etherscan.io`;
const BTC_BASE_URL = `https://${AppConfig.TESTNET ? 'testnet.' : ''}blockexplorer.com`;

export default {
    // The URL we're connecting to
    ETH_BASE_URL,
    BTC_BASE_URL,
    EthGetBalance: (addr) => {
        const url = `${ETH_BASE_URL}/api?module=account&action=balance&address=${addr}&tag=latest&apikey=${AppConfig.ETH_API_KEY}`;
        console.log('API', url);
        return url;
    },
    ETHGetTxs: (addr, page, txPerPage) => {
        const url = `${ETH_BASE_URL}/api?module=account&action=txlist&address=${addr}&startblock=0&endblock=99999999&page=${page}&offset=${txPerPage}&sort=desc&apikey=${AppConfig.ETH_API_KEY}`;
        console.log('API', url);
        return url;
    },
    ETHGetNonce: (addr) => {
        const url = `${ETH_BASE_URL}/api?module=proxy&action=eth_getTransactionCount&address=${addr}&tag=latest&apikey=${AppConfig.ETH_API_KEY}`;
        console.log('API', url);
        return url;
    },
    ETHCheckSmartContactAddr: (addr) => {
        // https://api.etherscan.io/api?module=proxy&action=eth_getCode&address=0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c&tag=latest&apikey=YourApiKeyToken
        const url = `${ETH_BASE_URL}/api?module=proxy&action=eth_getCode&address=${addr}&tag=latest&apikey=${AppConfig.ETH_API_KEY}`;
        console.log('API', url);
        return url;
    },
    ETHSendRawTx: (rawTx) => {
        //https://api.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=0xf904808000831cfde080&apikey=YourApiKeyToken
        const url = `${ETH_BASE_URL}/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTx}&apikey=${AppConfig.ETH_API_KEY}`;
        console.log('API', url);
        return url;
    },
    ETHViewTxDetail: (txid) => {
        //https://ropsten.etherscan.io/tx/0x4a46112733119acb338788afbc2fc550141e97990bc39ebcf4da3c503a37aa93
        const url = `${ETH_BASE_URL}/tx/${txid}`;
        console.log('API', url);
        return url;
    },
    BTCGetBalance: (addr) => {
        const url = `${BTC_BASE_URL}/api/addr/${addr}?noTxList=1`;
        console.log('API', url);
        return url;
    },
    BTCGetTxs: (addr, from, to) => {
        const url = `${BTC_BASE_URL}/api/addrs/${addr}/txs?from=${from}&to=${to}`;
        console.log('API', url);
        return url;
    },
    BTCGetUnspentOutputs: (addr) => {
        // /api/addr/[:addr]/utxo[?noCache=1]
        const url = `${BTC_BASE_URL}/api/addr/${addr}/utxo?noCache=1`;
        console.log('API', url);
        return url;
    },
    BTCViewTxDetail: (txid) => {
        //https://blockexplorer.com/tx/e154b0d3a0ee92798fd060af8378768372e34cc0a71c58544c0d40821a755a4c
        const url = `${BTC_BASE_URL}/tx/${txid}`;
        console.log('API', url);
        return url;
    },
    BTCSendRawTx: () => {
        const url = `${BTC_BASE_URL}/api/tx/send`;
        console.log('API', url);
        return url;
    },

    // App config
    WALLETCONFIG: 'https://fiatrate-ea33f.firebaseio.com/WalletQuantaConfig.json',

    // Map shortnames to the actual endpoints, so that we can
    // use them like so: AppAPI.ENDPOINT_NAME.METHOD()
    //  NOTE: They should start with a /
    //    eg.
    //    - AppAPI.recipes.get()
    //    - AppAPI.users.post()
    //    - AppAPI.favourites.patch()
    //    - AppAPI.blog.delete()
    endpoints: new Map([
        ['login', '/wp-json/jwt-auth/v1/token'], // If you change the key, update the reference below
        ['users', '/wp-json/wp/v2/users'],
        ['me', '/wp-json/wp/v2/users/me'],
        ['recipes', '/wp-json/wp/v2/recipes'],
        ['meals', '/wp-json/wp/v2/recipe_meal'],
    ]),

    // Which 'endpoint' key deals with our tokens?
    tokenKey: 'login',

    // In API, get Txs per page
    TXS_PER_PAGE: 20,
};
