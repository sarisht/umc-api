import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import {categoryToIcon} from "../../helpers/categoryHelper"
import { Claims } from '../../api/claims.js';
import { Policies } from '../../api/policies.js';
import { Wallet } from '../../api/wallet.js';
import { Notifications } from '../../api/notifications.js';
import ClaimCard from '../components/ClaimCard.jsx';
import ClaimListCard from '../components/ClaimListCard.jsx';
import PolicyCard from '../components/PolicyCard.jsx';



class ResultsPage extends Component {
    
    renderClaim(claim) {
        return (
            <ul><a key={claim._id} href={"/claims/" + claim._id} className="collection-item avatar">
                <i className="material-icons circle">{categoryToIcon(claim.category)}</i>
                <span className="title">{claim.title}</span>
                <p className="text-secondary">{claim.ask} UMC</p>
            </a>
            </ul>
        );
    }
    
    eligible_claims(notifications) {
        
        
        var claims = this.props.allclaims;
        var eclaims = [];
        for(j = 0; j < notifications.length; j++){
            console.log(notifications[j]);
            var id = notifications[j].claim_id;
            for(i = 0; i < claims.length; i++){
                console.log("id- "+id + "claimid- "+claims[i]._id);
                if(claims[i]._id == id)eclaims.push(claims[i]);
            }
        }
        return eclaims;
    }
    all_claims(eclaims){
        var rows = [];
        for (var i=0; i < eclaims.length; i++) {
            rows.push(this.renderClaim(eclaims[i]));
        }
        return <tbody>{rows}</tbody>;
    }
    

    
    renderEmpty() {
        return (
            <li className="collection-item text-secondary">No Claims yet</li>
        );
    }
    renderLoggedIn(){
        var list = this.eligible_claims(this.props.notifications);
        return (
            <div>
                <center><h4>Results</h4></center>
            <div className="claim-list-card card medium">
                <ul className="collection">
                    {this.props.notifications.length === 0  ? this.renderEmpty() : this.all_claims(list)}
                </ul>
            </div>
        </div>
        );
    }

    renderLoggedOut() {
        return (
            <div className="section">
                <h4>Please log in to check the results. </h4>
                
            </div>
        );
    }

    render() {
        console.log("f"+this.props.allclaims.length);
        return this.props.currentUser ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

ResultsPage.propTypes = {
    claims: PropTypes.array.isRequired,
    communityClaims: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    policy: PropTypes.object,
    wallet: React.PropTypes.object,
    notifications: React.PropTypes.object,
    allclaims: React.PropTypes.object,
};

export default createContainer(() => {
    
    Meteor.subscribe('claims');
    Meteor.subscribe('policies');
    Meteor.subscribe('wallet');
    Meteor.subscribe('notifications');

    return {
        communityClaims: Claims.find({ owner: { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } }).fetch(),
        claims: Claims.find({ sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        policy: Policies.findOne({ owner: Meteor.userId() }),
        wallet: Wallet.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        notifications: Notifications.find({user: Meteor.userId()}).fetch(),
        allclaims: Claims.find().fetch(),
    };
}, ResultsPage);