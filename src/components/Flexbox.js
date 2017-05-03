import React, { Component } from 'react';
import _ from 'lodash';

class Flexbox extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{
                display: 'flex',
                border: '1px solid red',
                flex: 1,
            }} >
                <div style={{
                    flex: 1,
                    border: '1px solid blue',
                }} >
                    AAA
                </div>
                <div style={{
                    flex: 3,
                    border: '1px solid green',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }} >
                    
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                        <div>BBB</div>
                    
                </div>
            </div>
        );
    }
}

export default Flexbox;
