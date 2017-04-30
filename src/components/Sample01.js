import React, { Component } from 'react';
import Bitcoin from '../libs/Bitcoin';
import { Api } from '../constants';

import RaisedButton from 'material-ui/RaisedButton';

class Sample01 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            private: '',
            balance: 0
        }
    }

    componentDidMount() {

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

    initWallet() {
        //copper siren differ use like egg sight where spoon learn swamp swarm
        //saddle marriage volcano stool organ federal february elbow art extra wood thunder
        const mnemonic = 'copper siren differ use like egg sight where spoon learn swamp swarm';
        const btc = Bitcoin.createAddressFromMasterSeed(mnemonic);
        console.log('initWallet', btc);
        this.setState({ address: btc.addr, private: btc.privateKey });

        this.getBalance(btc.addr);
    }

    render() {
        return (
            <div className="App">
                <h1>Hello, world! Again</h1>
                <h2>Btc Address: {this.state.address}</h2>
                <h2>Btc Balance: {this.state.balance}</h2>
                <RaisedButton
                    label='Init Wallet'
                    onTouchTap={() => this.initWallet()}
                />
            </div>
        );
    }
}

export default Sample01;
