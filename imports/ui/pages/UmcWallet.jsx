import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Claims } from '../../api/claims.js';
import { Policies } from '../../api/policies.js';
import { Wallet } from '../../api/wallet.js';
import ClaimCard from '../components/ClaimCard.jsx';
import ClaimListCard from '../components/ClaimListCard.jsx';
import PolicyCard from '../components/PolicyCard.jsx';


class UmcWallet extends Component {
    
    address(){
        return this.props.wallet;
    }

    handleFileClick(event) {
        event.preventDefault();
        var address = Math.floor(Math.random()*900000) + 100000;
        var balance = 0;
        Meteor.call('wallet.insert', address, balance);
    }

    renderLoggedInWithWallet() {
        let res = this.address();
        return (
            <div className="section">
                <h3> Wallet</h3>
                <div className="row">
                    <div className="col s12">
                       UMC Wallet Address: {res[0].wallet}
                    </div>
                    <div className="col s12">
                       UMC Wallet Balance: {res[0].balance}
                    </div>
                    <div className="col s12">
                       Add/Withdraw Balance
                    </div>
                    <div className="col s12">
                       Send UMC coins
                    </div>
                    <div className="col s12">
                       Request UMC coins
                    </div>
                </div>
            </div>
        );
    }

    renderLoggedInWithoutWallet() {
       
        return (
            <div className="section">
                <div className="col s4">
                Add Wallet
                <a href="#" onClick={this.handleFileClick.bind(this)}>
                <i className="material-icons">add</i>
                </a>
                </div>
            </div>
        );
    }

    renderLoggedIn(){
        console.log(this.props.wallet);
        return this.props.wallet.length>0 ? this.renderLoggedInWithWallet() : this.renderLoggedInWithoutWallet();
    }

    renderLoggedOut() {
        return (
            <div className="section">
                <h4>Please log in </h4>
                
            </div>
        );
    }

    render() {
        return this.props.currentUser ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

UmcWallet.propTypes = {
    claims: PropTypes.array.isRequired,
    communityClaims: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    policy: PropTypes.object,
    wallet: React.PropTypes.object,
};

export default createContainer(() => {
    
    Meteor.subscribe('claims');
    Meteor.subscribe('policies');
    Meteor.subscribe('wallet');
    return {
        communityClaims: Claims.find({ owner: { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } }).fetch(),
        claims: Claims.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        policy: Policies.findOne({ owner: Meteor.userId() }),
        wallet: Wallet.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
    };
}, UmcWallet);