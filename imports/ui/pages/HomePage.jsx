import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Claims } from '../../api/claims.js';
import { Policies } from '../../api/policies.js';

class HomePage extends Component {
    renderMyPolicies() {
        if (!this.props.policies.length)
            return <li className="collection-item">No Policies</li>;
        return this.props.policies.map((policy) => {
            return <a href="#" key={policy._id} className="collection-item">Name: {policy.name}, Amount: {policy.amount} UMC</a>;
        });
    }

    renderMyClaims() {
        if (!this.props.claims.length)
            return <li className="collection-item">No Claims</li>;
        return this.props.claims.map((claim) => {
            return <a href="#" key={claim._id} className="collection-item">Policy: {claim.policyName}, Ask: {claim.ask} UMC</a>;
        });
    }

    renderOthersClaims() {
        if (!this.props.othersClaims.length)
            return <li className="collection-item">No Claims</li>;
        return this.props.othersClaims.map((claim) => {
            return <a href="#" key={claim._id} className="collection-item">Policy: {claim.policyName}, Ask: {claim.ask} UMC</a>;
        });
    }

    renderLoggedIn() {
        return (
            <div className="section">
                <div className="row">
                    <div className="col s12">
                        <ul className="card collection with-header">
                            <li className="collection-header">
                                <h4>My Policies</h4>
                            </li>
                            {this.renderMyPolicies()}
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <ul className="card collection with-header">
                            <li className="collection-header"><h4>My Claims</h4></li>
                            {this.renderMyClaims()}
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <ul className="card collection with-header">
                            <li className="collection-header"><h4>Others' Claims</h4></li>
                            {this.renderOthersClaims()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    static renderLoggedOut() {
        return (
            <div className="section">
                <h4>Please Log In</h4>
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
        policies: Policies.find({}, { sort: { createdAt: -1 } }).fetch(),
        claims: Claims.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        othersClaims: Claims.find({ owner: { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
}, HomePage);