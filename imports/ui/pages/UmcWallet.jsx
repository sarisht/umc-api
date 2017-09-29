import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Claims } from '../../api/claims.js';
import { Policies } from '../../api/policies.js';

import ClaimCard from '../components/ClaimCard.jsx';
import ClaimListCard from '../components/ClaimListCard.jsx';
import PolicyCard from '../components/PolicyCard.jsx';

class UmcWallet extends Component {

    renderLoggedIn() {
        return (
            <div className="section">
                <h4>UMC Wallet</h4>
                <div className="row">
                    <div className="col s12">
                       UMC Wallet Address:
                    </div>
                    <div className="col s12">
                       UMC Wallet Balance:
                    </div>
                </div>
            </div>
        );
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
};

export default createContainer(() => {
    Meteor.subscribe('claims');
    Meteor.subscribe('policies');

    return {
        communityClaims: Claims.find({ owner: { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } }).fetch(),
        claims: Claims.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        policy: Policies.findOne({ owner: Meteor.userId() }),
    };
}, UmcWallet);