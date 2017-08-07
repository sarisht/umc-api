import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Claims } from '../../api/claims.js';
import { Policies } from '../../api/policies.js';

import ClaimPage from './ClaimPage.jsx';

class HomePage extends Component {
    renderPolicyCard(policy) {
        return (
            <div>
                <div className="col s12 l5">
                    <div className="card policy-card small">
                        <div className="card-content">
                            <div className="card-title">My Policy<i className="material-icons right">mode_edit</i></div>
                            <p className="text-secondary">Created July 31, 2017</p>
                            <div className="row">
                                <div className="col s6">
                                    <h3>500</h3>
                                    <p className="text-secondary">UMC Put In</p>
                                </div>
                                <div className="col s6">
                                    <h3>2,500</h3>
                                    <p className="text-secondary">Max Payout</p>
                                </div>
                                <div className="col s6">
                                    <h3>2,500</h3>
                                    <p className="text-secondary">Payout Left</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s12 l4">
                    <div className="card small claims-card">
                        <ul className="collection">
                            <div className="card-content teal">
                                <a className="btn-floating halfway-fab waves-effect waves-light"><i className="material-icons">add</i></a>
                                <div className="card-title">Claims</div>
                            </div>
                            <a href="#" className="collection-item avatar">
                                <i className="material-icons circle">directions_car</i>
                                <span className="title">Auto Claim</span>
                                <p className="text-secondary">5,000 UMC</p>
                            </a>
                            <a href="#" className="collection-item avatar">
                                <i className="material-icons circle">home</i>
                                <span className="title">Home Claim</span>
                                <p className="text-secondary">8,000 UMC</p>
                                <div className="secondary-content white-text"><i className="material-icons">check</i></div>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    renderFloatCard() {
        return (
            <div className="col s12 l3">
                <div className="card small light-blue darken-1">
                    <div className="card-content">
                        <div className="card-title"><i className="material-icons right">info</i></div>
                    </div>
                    <div className="card-content center-align">
                        <h3>120,000</h3>
                        <p className="text-secondary">Float UMC</p>
                    </div>
                </div>
            </div>
        );
    }

    renderPolicyOld(policy) {
        return (
            <div key={policy._id} className="col s12 m6 l4">
                <div className="card blue-grey darken-1">
                    <div className="card-content">
                        <div className="card-title">{policy.name}</div>
                        <p>Amount: {policy.amount} UMC</p>
                        <p>Created this Date</p>
                        <p>This category</p>
                    </div>
                    <div className="card-action">
                        <a className="white-text" href="#">File Claim</a>
                        <a className="white-text" href="#">Delete Policy</a>
                    </div>
                </div>
            </div>
        );
    }

    renderPolicyAddButton() {
        return (
            <div className="col s12 m6 l3">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <p className="center"><i className="add-policy material-icons">add</i></p>
                    </div>
                    <div className="add-policy-action card-action center">
                        <a className="white-text" href="#">Add Policy</a>
                    </div>
                </div>
            </div>
        );
    }

    renderClaim(claim) {
        return (
            <div key={claim._id} className="col s12 m6 l4">
                <div className="card blue-grey darken-1">
                    <div className="card-content">
                        <div className="card-title">{claim.policyName}</div>
                        <p>Ask: {claim.ask} UMC</p>
                    </div>
                    <div className="card-action">
                        <a className="white-text" href="#">Edit Claim</a>
                        <a className="white-text" href="#">Delete Claim</a>
                    </div>
                </div>
            </div>
        );
    }

    renderPolicies() {
        return this.props.policies.map(this.renderPolicy);
    }

    renderClaims(claims) {
        return claims.map(this.renderClaim);
    }

    renderOthersClaims(claims) {
        return claims.map((claim) => {
            return <ClaimPage key={claim._id} claim={claim} />;
        });
    }

    renderLoggedIn() {
        return (
            <div className="section">
                {/*this.props.claims.length > 0 ?
                    <div>
                        <h4>Manage Claims</h4>
                        <div className="row">
                            {this.renderOthersClaims(this.props.claims)}
                        </div>
                    </div> : ''*/}
                <h4>Manage Data</h4>
                <div className="row">
                    {this.renderPolicyCard(this.props.policies[0])}
                    {this.renderFloatCard()}
                </div>
                <h4>Vote on Claims</h4>
                <div className="row">
                    {this.renderOthersClaims(this.props.othersClaims)}
                </div>
            </div>
        );
    }

    static renderLoggedOut() {
        return (
            <div className="section">
                <p className="flow-text">Welcome to Umbrella Coin (UMC), a next-generation blockchain application for covering hidden costs of traditional insurance. As part of the UMC community, you are able to open policies and claims, as well as vote on claims by other members of our community. We're all here to help one another. Please create an account or log in to continue</p>
            </div>
        );
    }

    render() {
        return (
            <div>
                { this.props.currentUser ? this.renderLoggedIn() : HomePage.renderLoggedOut() }
            </div>
        );
    }
}

HomePage.propTypes = {
    policies: PropTypes.array.isRequired,
    claims: PropTypes.array.isRequired,
    othersClaims: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('policies');
    Meteor.subscribe('claims');

    return {
        policies: Policies.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        claims: Claims.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        othersClaims: Claims.find({ owner: { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
}, HomePage);