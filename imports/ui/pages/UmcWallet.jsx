import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import StatCard from '../components/StatCard.jsx';
import {Wallet} from '../../api/wallet.js';

var abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "floatHolder",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var myContract = web3.eth.contract(abi);
var umc = "0x8b687dc25a172651174e3cace67c0f551ac8e277";
var contract_data = myContract.at(umc);
class UmcWallet extends Component {
    handleFileClick(event) {
        event.preventDefault();
        // Creation of wallet, pop up for private key, address goes to database
        var Accounts = require('web3-eth-accounts');
        var accounts = new Accounts('http://localhost:8545');
        var wel = web3.personal.newAccount('!@superpassword');
        var balance =  0;
        // console.log(wel);
        Meteor.call('wallet.insert', wel, balance);//New account inserted with starting balance 0
    }
    
    
        
handleFileClickforSend(event) {
        event.preventDefault();

        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            console.log("on the real network..?");
            
            
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            console.log("on the local network..8545");
            
        }
        let resi = this.props.wallet;
        web3.personal.unlockAccount(web3.eth.defaultAccount,'!@superpassword');
        //console.log(resi[0].wallet);
        var receiver = document.getElementById('receiverWalletAddress'); 
        //console.log(receiver.value);
        var amount = document.getElementById('sendAmount');     
        contract_data.transfer(receiver.value,amount.value);
        let wallet_address = this.refs.wallet.value.trim();
        let res = this.props.wallet;
        let id = res[0]._id;
        let address = res[0].wallet;
        
       Meteor.call('wallet.update', id, amount.value, address, wallet_address);
    }

    renderRequestCoinsCard() {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="card-title">Request UMC Coins</div>
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleFileClickforSend.bind(this)}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" ref="email" type="email"/>
                                    <label htmlFor="email">Receiver's Email Address</label>
                                </div>
                                <div className="input-field col s12">
                                    <button className="btn-large waves-effect waves-light" type="submit">Request
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    renderSendCoinsCard() {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="card-title">Send UMC Coins</div>
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleFileClickforSend.bind(this)}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="receiverWalletAddress" type="text" ref="wallet"/>
                                    <label htmlFor="receiverWalletAddress">Receiver's Wallet Address</label>
                                </div>
                                <div className="input-field col s12">
                                    <input id="sendAmount" type="number" ref="amount"/>
                                    <label htmlFor="sendAmount">Amount</label>
                                </div>
                                <div className="input-field col s12">
                                    <button className="btn-large waves-effect waves-light" type="submit">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    renderLoggedInWithWallet() {
        let res = this.props.wallet;
        console.log(res);
        web3.eth.defaultAccount = res[0].wallet;
        var balance = parseInt(contract_data.balanceOf(web3.eth.defaultAccount));
        return (
            <div className="section">
                <div className="row">
                    <div className="col m4 s12">
                        <StatCard caption="UMC Wallet Address" metric={res[0].wallet}/>
                        <StatCard caption="UMC Wallet Balance" metric={balance}/>
                        <a className="waves-effect waves-light btn-large">Deposit / Withdraw</a>
                    </div>
                    <div className="col m8 s12">
                        {this.renderSendCoinsCard()}
                        {this.renderRequestCoinsCard()}
                    </div>
                </div>
            </div>
        );
    }

    renderLoggedInWithoutWallet() {
        return (
            <div className="section">
                <a className="waves-effect waves-light btn-large" onClick={this.handleFileClick.bind(this)}>
                    <i className="material-icons right">add</i>Add Wallet
                </a>
            </div>
        );
    }

    renderLoggedIn() {
        return this.props.wallet.length > 0 ? this.renderLoggedInWithWallet() : this.renderLoggedInWithoutWallet();
    }

    renderLoggedOut() {
        return (
            <div className="section">
                <h4>Please log in</h4>
            </div>
        );
    }

    render() {
        return this.props.currentUser ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

UmcWallet.propTypes = {
    currentUser: PropTypes.object,
    wallet: React.PropTypes.array,
};

export default createContainer(() => {
    Meteor.subscribe('wallet');

    return {
        currentUser: Meteor.user(),
        wallet: Wallet.find({owner: Meteor.userId()}, {sort: {createdAt: -1}}).fetch(),
    };
}, UmcWallet);