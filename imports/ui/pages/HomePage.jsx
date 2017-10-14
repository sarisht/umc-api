import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Claims } from '../../api/claims.js';
import { Policies } from '../../api/policies.js';

import ClaimCard from '../components/ClaimCard.jsx';
import ClaimListCard from '../components/ClaimListCard.jsx';
import PolicyCard from '../components/PolicyCard.jsx';

class HomePage extends Component {
    renderCommunityClaims(claims) {
        return claims.map((claim) => {
            return (
                <div key={claim._id} className="col s12 m6 l4">
                    <ClaimCard claim={claim} />
                </div>
            );
        });
    }

    renderLoggedIn() {
        return (
            <div className="section">
                <div className="row">
                    <h4 className="col s12">Manage Data</h4>
                    <div className="col s12 l8">
                        <PolicyCard policy={this.props.policy} />
                    </div>
                    <div className="col s12 l4">
                        <ClaimListCard claims={this.props.claims} policy={this.props.policy} />
                    </div>
                </div>
                <div className="row">
                    <h4 className="col s12">Vote on Claims</h4>
                    {this.renderCommunityClaims(this.props.communityClaims)}
                </div>
            </div>
        );
    }

    renderLoggedOut() {
        return (
            <div className="section">
                <div className="row">
                    <div className="col s12">
                        <h4>Welcome to the Next Generation of Insurance!</h4>
                        <p className="flow-text">We're a next-generation blockchain application for covering hidden costs of traditional insurance. As part of the UMC community, you are able to open policies and claims, as well as vote on claims by other members of our community. We're all here to help one another. Please create an account or log in to continue</p>
                    </div>
                </div>
                <div className="row">
                    <h4 className="col s12">Community Claims</h4>
                    {this.renderCommunityClaims(this.props.communityClaims)}
                </div>
            </div>
        );
    }

    render() {
        return this.props.currentUser ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

HomePage.propTypes = {
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
}, HomePage);