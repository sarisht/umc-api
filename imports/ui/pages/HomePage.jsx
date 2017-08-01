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

    renderClaims(claims) {
        if (!claims.length)
            return <li className="collection-item">No Claims</li>;
        return claims.map((claim) => {
            var href = "/claims/" + claim._id;
            return <a href={href}
                      key={claim._id} className="collection-item">Policy: {claim.policyName}, Ask: {claim.ask} UMC</a>;
        });
    }

    renderLoggedIn() {
        return (
            <div className="section">
                <div>
                    <h4>Manage Your Data</h4>
                    <div className="row">
                        <div className="col s6">
                            <ul className="card collection with-header">
                                <li className="collection-header">
                                    <h5>My Policies</h5>
                                </li>
                                {this.renderMyPolicies()}
                            </ul>
                        </div>
                        <div className="col s6">
                            <ul className="card collection with-header">
                                <li className="collection-header"><h5>My Claims</h5></li>
                                {this.renderClaims(this.props.claims)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Others' Claims</h4>
                    <div className="row">
                        <div className="col s6">
                            <ul className="card collection with-header">
                                <li className="collection-header"><h5>Awaiting Votes</h5></li>
                                {this.renderClaims(this.props.othersClaims)}
                            </ul>
                        </div>
                        <div className="col s6">
                            <ul className="card collection with-header">
                                <li className="collection-header"><h5>All Claims</h5></li>
                                {this.renderClaims(this.props.othersClaims)}
                            </ul>
                        </div>
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