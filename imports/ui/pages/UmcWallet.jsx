import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import StatCard from '../components/StatCard.jsx';
import {Wallet} from '../../api/wallet.js';
/*

Available Accounts
==================
(0) 0xafa94cc4cace51a8a42f744fac3751df2190a86e
(1) 0x0f1a9f85c1489c149c1c692ea3dbb9c56d09790c
(2) 0x388c520aa5c9f1d2f66b1a9131598273a4a5def5
(3) 0x7a5653410e6bcccb6c085f848d8dee4870129d2e
(4) 0x5294ac1d576230af2ad4c001a0942a6fc8f84a87
(5) 0xe64bdaf55bb318b26b3e561436e187129d70f93c
(6) 0x27ee477c249cdb636aacc6f52675eeb43173d6ba
(7) 0xb1b17af25ceb30542053a430ea160bb0e2bea7b2
(8) 0x152eea120ffdd1832033e6bdd072cf9de126b01b
(9) 0xa1a5411022d06aa5582d14aed22a93831f68790e

Private Keys
==================
(0) 3ae1c09679b1df52f9bd72725199ae38f3790f05ee5e8534de79b7ab4cc140eb
(1) 8da9f3aeb997493f1cf1a8bfbd105ac68e4969e240e29db9bf80618b04997c06
(2) 5e0a3950dda7ad68a2e23fce05509936cb642dc2b59d575b7df8bfd55ca1eb64
(3) b6a35ad8797b64caae630354230dbe2f39127b99b8c5a22e55fbdc8f64951721
(4) 867fd0efe442e93a7ef89fd6703459ad7227aa325fbd6ec7f2bfe673999e23f6
(5) 9d8e395e91be1da321e121900d240818ee50411243e289db89209a9fa79d15ba
(6) a4cc39f293a4c6c1711bae86ec9d6eeb01a5343ef9ad8196d9e75427f939eb87
(7) 499f6b86a4f4dff755e22cc168950ebd44bd21b5bc1345c3318442ca3c98f1f5
(8) 322121eb13fd0f9a0012cd68d0ab9fa2d700611e36064f60487d5efeb0f963ba
(9) 1e5779fe10a44aaf00d73ea3e47e745751b2a1ac5ecde97ac4dc5d8f135e739f


*/

class UmcWallet extends Component {
    handleFileClick(event) {
        event.preventDefault();

        let address = Math.floor(Math.random() * 900000) + 100000;
        let balance =  0;
        // Creation of wallet, pop up  for private key, address goes to database
        //var Accounts = require('web3-eth-accounts');
        //var accounts = new Accounts('http://localhost:8545');
        //var wel = accounts.create();
        //console.log(wel);
        // Meteor.call('wallet.insert', address, balance);
    }
    //0xcbf2bcc07015978c16b559bda6a20ff7b98d2cd8
    
        
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
        web3.eth.defaultAccount = web3.eth.accounts[0];
        var receiver = document.getElementById('receiverWalletAddress'); 
        var amount = document.getElementById('sendAmount');        
        var umc = "0x84c69e19d0c94a10eca7caf16106eb51296e8410";
        var contract_data = myContract.at(umc);
        contract_data.transfer(receiver.value,amount.value);
        let wallet_address = this.refs.wallet.value.trim();
        let res = this.props.wallet;
        let id = res[0]._id;
        let address = res[0].wallet;
        
       // Meteor.call('wallet.update', id, amount, address, wallet_address);
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
        const balance = res[0].balance;

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