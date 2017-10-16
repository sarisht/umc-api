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

        Meteor.call('wallet.insert', address, balance);
    }

    handleFileClickforSend(event) {
        event.preventDefault();

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