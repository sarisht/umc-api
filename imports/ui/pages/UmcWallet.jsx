import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import StatCard from '../components/StatCard.jsx';
import {Wallet} from '../../api/wallet.js';


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
        
        var myContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]);
        var umc_address = '0x190fb342aa6a15eb82903323ae78066ff8616746';
        var contract_data = myContract.at(0x4776bf4fe023ca7cacfdf92479240f33cd5430a2);
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
        var acc1 = "0xcbf2bcc07015978c16b559bda6a20ff7b98d2cd8";
        //new acc
        // address: "0x8d3e37C565CE5Bd01f2B6d35d0b1A0BC82d23B75"
        // encrypt: function encrypt()
        // privateKey: "0xf1dd6714bf627ce49c3421c69b7d8aad77a5c3729f558fc85a7be8014afbd3ec"
        // sign: function sign()
        // signTransaction: function signTransaction()
        //
        var new_acc1 = "0x8d3e37C565CE5Bd01f2B6d35d0b1A0BC82d23B75";
        eth.getBalance(acc1).then(console.log);
        eth.getBalance(new_acc1).then(console.log);
        contract_data.transfer(acc1,100);
        
        let wallet_address = this.refs.wallet.value.trim();
        let amount = parseInt(this.refs.amount.value.trim());

        let res = this.props.wallet;
        let id = res[0]._id;
        let address = res[0].wallet;
        
        Meteor.call('wallet.update', id, amount, address, wallet_address);
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