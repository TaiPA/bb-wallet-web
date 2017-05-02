/**
 * Utils class
 * 
 * @author AnhTai <taipa@cardano-labo.com>
 */
import _ from 'lodash';
import Bitcoinjs from 'bitcoinjs-lib';
import CoinsUtil from './CoinsUtil';
import ValidateAddress from 'bitcoin-address';
import { AppConfig } from '../constants';
import Units from 'ethereumjs-units';

const HDPathString = (AppConfig.TESTNET) ? "m/44'/1'/0'/0" : "m/44'/0'/0'/0";
const DUST = 546; // Bitcoin dust value by satoshi.

export default class Bitcoin {
    /**
     * 
     * @param targetScreen : targetScreen's screen key
     * @param type : Type of route (push or pop), default is push
     */
    static createAddressFromMasterSeed(seed, index = 0) {
        const network = (AppConfig.TESTNET) ? Bitcoinjs.networks.testnet : Bitcoinjs.networks.bitcoin;
        const master = Bitcoinjs.HDNode.fromSeedBuffer(CoinsUtil.mnemonicToSeed(seed), network);
        const child = master.derivePath(HDPathString).derive(index);
        return {
            addr: child.getAddress(),
            privateKey: child.keyPair.toWIF()
        };
    }

    static createRawTx(utxo, to, value, privateKey, estimateFee, feePerByte) {
        const sValue = Number(Units.convert(value, 'btc', 'satoshi'));
        const sEstimateFee = Number(Units.convert(estimateFee, 'btc', 'satoshi'));

        const network = (AppConfig.TESTNET) ? Bitcoinjs.networks.testnet : Bitcoinjs.networks.bitcoin;
        let tx = new Bitcoinjs.TransactionBuilder(network);

        // Add the input (who is paying):
        // [previous transaction hash, index of the output to use]
        const sortedUtxo = _.sortBy(utxo, (obj) => obj.amount);
        const inputs = this.selectUTXO(sortedUtxo, sValue + sEstimateFee);
        let totalIn = 0;
        _.each(inputs, (obj) => {
            tx.addInput(obj.txid, obj.vout);
            totalIn += obj.satoshis;
        });

        // Add the output (who to pay to):
        // [payee's address, amount in satoshis]
        tx.addOutput(to, sValue);

        // Caculate Fee Satoshi per Byte
        const fee = this.estimateTxSize(inputs) * feePerByte;

        // Add return amount to my account
        const returnAmount = totalIn - sValue - fee;
        if (returnAmount > DUST) {
            tx.addOutput(inputs[0].address, returnAmount);
        }

        // Initialize a private key using WIF
        const keyPair = Bitcoinjs.ECPair.fromWIF(privateKey, network);

        // Sign the first input with the new key
        _.times(inputs.length, (i) => tx.sign(i, keyPair));

        // Print transaction serialized as hex
        console.log('TX SIZE', tx.build().byteLength());
        console.log('BTC-RAW-TX', tx.build().toHex());
        // => 0100000001313eb630b128102b60241ca895f1d0ffca21 ...

        // You could now push the transaction onto the Bitcoin network manually
        // (see https://blockchain.info/pushtx)∏

        return tx.build().toHex();
    }

    static selectUTXO(utxo, value) {
        // https://medium.com/@lopp/the-challenges-of-optimizing-unspent-output-selection-a3e5d05d13ef
        if ((_.last(utxo)).satoshis >= value) {
            let tx = null;
            _.each(utxo, (obj) => {
                if (obj.satoshis >= value) {
                    tx = obj;
                    return false; // Break lodash.each
                }
            });
            return [tx];
        } else {
            const tx = _.last(utxo);
            const nextUtxo = [...utxo];
            _.pullAt(nextUtxo, [nextUtxo.length - 1]);
            return [tx, ...this.selectUTXO(nextUtxo, value - tx.satoshis)];
        }
    }

    static estimateFee(utxo, value, feePerByte) {
        // console.log('estimateFee', utxo, value, feePerByte);
        const sValue = Number(Units.convert(value, 'btc', 'satoshi'));
        const sortedUtxo = _.sortBy(utxo, (obj) => obj.satoshis);
        let inputs = this.selectUTXO(sortedUtxo, sValue);
        let fee = this.estimateTxSize(inputs) * feePerByte;
        const totalInAmount = _.reduce(inputs, (result, obj) => (result + obj.satoshis), 0);
        if ((sValue + fee) > totalInAmount) {
            inputs = this.selectUTXO(sortedUtxo, sValue + fee);
            fee = this.estimateTxSize(inputs) * feePerByte;
        }

        return Number(Units.convert(fee, 'satoshi', 'btc'));
    }

    /**
     * Estimate Transaction Size in Byte
     */
    static estimateTxSize(input) {
        const transactionSize = (input.length * 146) + (2 * 34) + 10 + input.length;
        return transactionSize;
    }

    static validateAddress(addr) {
        return (AppConfig.TESTNET)
            ? ValidateAddress.validate(addr, 'testnet')
            : ValidateAddress.validate(addr);
    }
}

