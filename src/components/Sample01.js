import React, { Component } from 'react';
import Bitcoin from '../libs/Bitcoin';
// import { Api } from '../constants';

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

    initWallet() {
        const mnemonic = 'hill date natural inhale city explore able still deadly bitter sneak mist';
        const btc = Bitcoin.createAddressFromMasterSeed(mnemonic);
        this.setState({ address: btc.addr, private: btc.privateKey });
    }

    render() {
        return (
            <div className="App">
                <h1>Hello, world! Again</h1>
                <h2>Btc Address: {this.state.address}</h2>
                <h2>Btc Balance: {this.state.balance}</h2>
                <RaisedButton
                    label="Default"
                    onTouchTap={() => this.initWallet()} 
                />
            </div>
        );
    }
}

//<h2>Btc Address: {this.state.address}</h2>
//                <h2>Btc Balance: {this.state.balance}</h2>

export default Sample01;
