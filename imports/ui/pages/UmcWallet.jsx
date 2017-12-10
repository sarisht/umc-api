import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import StatCard from '../components/StatCard.jsx';
import {Wallet} from '../../api/wallet.js';
/*
Available Accounts
==================
(0) 0x3dac6ca074800ea0cbdb0102c1fdfbe243150f7b
(1) 0xc97e9208045fc73e39d35b51e6d6fd6a87304e2a
(2) 0xb8425e6ea20e861630266d06eec9e33ec867cd8f
(3) 0xf9ce40198ee899f74f66144fdd26ccbaec909ae2
(4) 0x93b120834f48e63f79625fee75846471447d3382
(5) 0xc02993506ab5f85fcc00d9bc9078949556364ef4
(6) 0x44909a0e64cd5f5e229215581da5ff26546ac873
(7) 0x6e9ab0bac2542aa98a658a172ea53f9792e853b1
(8) 0xda6cddb3e9bf6d129c45523f6ad4efbfebed23e7
(9) 0xdc1b7b964f7a9135e259dce196ae58a418095873

Private Keys
==================
(0) 2a255c360c443fc4be6de754741693246beecce0d0ab1b47272a056cbf5d6673
(1) 089e7900ca3fe26d70e9850d11e78b14c980f1d61c708d7a57cfea265b5be714
(2) 03bf41bc4bf2a85772e07828c2a561eeb9c94633daade74f588f83836b43593b
(3) b4eb320444e487cd21cd17b85e5db9dec4c1d8d9525feab3eaf75867563dbd0c
(4) b6f1638f9ce4bebf0dffc231f527b9e7cef7eacedfe56240a7e8d9a9172b7b76
(5) db6390b18668ffc28ba75387efb6042383ca153a9184d8d604ca007742e63805
(6) 2b88d5a7d27f1e56c1b411ae25ba2574dfbe72803501a0b765c017dfb31f2784
(7) 679c8ddfe342c66780e64429514c6e05577a814952bfd3dfe8439e601c5b23e2
(8) b10daa213fba865a78f8846bc1e7321b6ffcf320a8a1fe1abfa371fa1a79226b
(9) f719c2f7ebdf95abd394de8f98f56ca6cd267984a19ceb5ce1348cf1df8d4f06



*/

class UmcWallet extends Component {
    handleFileClick(event) {
        event.preventDefault();

        let address = Math.floor(Math.random() * 900000) + 100000;
        let balance = 0;
        // Creation of wallet, pop up  for private key, address goes to database
        // var Accounts = require('web3-eth-accounts');
        // var accounts = new Accounts('http://localhost:8545');
        // var wel = accounts.create();
        // console.log(wel);
        Meteor.call('wallet.insert', address, balance);
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
        //var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"floatHolder","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        var myContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]);
        var sender = '0x3dac6ca074800ea0cbdb0102c1fdfbe243150f7b';
        var receiver = '0xc97e9208045fc73e39d35b51e6d6fd6a87304e2a';
        
        var umc = '0x36692a83397812b1d06e688da348dd34219ddd41';
        var contract_data = myContract.at(umc);
        var Accounts = require('web3-eth-accounts');
        var accounts = new Accounts('http://localhost:8545');
        var wel = accounts.create();
        console.log(wel);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        console.log(myContract);
        console.log(contract_data);

        var Eth = require('web3-eth');
        
        // "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
        //var eth = new Eth(Eth.givenProvider || 'http://localhost:8545');
        var eth = new Eth('http://localhost:8545');
        
        eth.getBalance(sender).then(console.log);
        eth.getBalance(receiver).then(console.log);
        eth.getBalance(umc).then(console.log);
        //var getData = contract_data.transfer.getData(receiver,100);
        //web3.eth.sendTransaction({to:receiver, from:sender, data: getData});
        web3.eth.sendTransaction({to:receiver, from:sender, value:web3.toWei("0.5", "ether")})
        let wallet_address = this.refs.wallet.value.trim();
        let amount = parseInt(this.refs.amount.value.trim());

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