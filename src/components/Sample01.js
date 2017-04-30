import React, { Component } from 'react';
import Bitcoin from '../libs/Bitcoin';
import { Api } from '../constants';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = {
    container: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column'
    },
    row1: {
        flex: 1,
        // border: '1px groove red',
        // justifyContent: 'flex-end'
        alignItems: 'center',
    },
    textInput: {
        marginLeft: 20,
        width: '500px',
        flex: 1
    },
    fieldTitle: {
        width: 100
    },

};

class Sample01 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hdseed: '',
            address: '',
            private: '',
            balance: 0,
            utxo: [],
            coinPrice: null,
            fee: null,
            sendValue: 0,
            sendTo: ''
        }
    }

    componentDidMount() {
        this.getWalletConfig();
    }

    componentWillUnmount() {

    }

    getBalance(addr) {
        fetch(Api.BTCGetBalance(addr))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('getBalance', responseJson);
                this.setState({ balance: responseJson.balance });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getUnspendOutput(addr) {
        fetch(Api.BTCGetUnspentOutputs(addr))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('getUnspendOutput', responseJson);
                this.setState({ utxo: responseJson });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getWalletConfig() {
        fetch(Api.WALLETCONFIG)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('getWalletConfig', responseJson);
                this.setState({
                    coinPrice: responseJson.coinPrice,
                    fee: responseJson.fee
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    initWallet() {
        // involve note unlock relief cliff general quiz tourist grid consider miracle early
        //copper siren differ use like egg sight where spoon learn swamp swarm
        //saddle marriage volcano stool organ federal february elbow art extra wood thunder
        // const mnemonic = 'copper siren differ use like egg sight where spoon learn swamp swarm';
        const btc = Bitcoin.createAddressFromMasterSeed(this.state.hdseed);
        console.log('initWallet', btc);
        this.setState({ address: btc.addr, private: btc.privateKey });

        this.getBalance(btc.addr);
        this.getUnspendOutput(btc.addr);
    }

    sendBtc() {
        const estimateFee = Bitcoin.estimateFee(this.state.utxo, this.state.sendValue, this.state.fee.btc.medium);
        const rawTx = Bitcoin.createRawTx(this.state.utxo, this.state.sendTo, this.state.sendValue, this.state.private, estimateFee, this.state.fee.btc.medium);
        console.log('sendBtc - rawTx', rawTx);

        fetch(Api.BTCSendRawTx(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rawtx: rawTx })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('sendBtc result:', responseJson);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
                throw (error);
            });
    }

    handleChangeSendToAddress(event, newValue) {
        this.setState({ sendTo: newValue });
    }

    handleChangeSendValue(event, newValue) {
        this.setState({ sendValue: newValue });
    }

    render() {
        return (
            <Paper zDepth={2} style={styles.container}>
                <div style={styles.row1}>
                    <TextField
                        hintText="Passphrases"
                        style={styles.textInput}
                        value={this.state.hdseed}
                        onChange={(event, newValue) => { this.setState({ hdseed: newValue }) }} />
                    <RaisedButton
                        label='Init Wallet'
                        style={{ flex: 1 }}
                        onTouchTap={() => this.initWallet()}
                    />
                    <Divider />
                </div>
                <div style={styles.row1}>
                    <span style={styles.fieldTitle}>
                        Address
                    </span>
                    <TextField
                        hintText="Address"
                        disabled={true}
                        style={styles.textInput}
                        value={this.state.address} />
                    <Divider />
                </div>
                <div style={styles.row1}>
                    <span style={styles.fieldTitle}>
                        Balance
                    </span>
                    <TextField
                        disabled={true}
                        hintText="Balance"
                        style={styles.textInput}
                        value={this.state.balance}
                    />
                    <Divider />
                </div>
                <div style={styles.row1}>
                    <span style={styles.fieldTitle}>
                        SendTo
                    </span>
                    <TextField
                        hintText="Btc Address"
                        style={styles.textInput}
                        onChange={this.handleChangeSendToAddress.bind(this)}
                        value={this.state.sendTo}
                    />
                </div>
                <div style={styles.row1}>
                    <span style={styles.fieldTitle}>
                        Value
                    </span>
                    <TextField
                        hintText="BTC value"
                        style={styles.textInput}
                        onChange={this.handleChangeSendValue.bind(this)}
                        value={this.state.sendValue}
                    />
                    <RaisedButton
                        label='SEND'
                        onTouchTap={() => this.sendBtc()}
                    />
                </div>
            </Paper>
        );
    }
}

export default Sample01;
