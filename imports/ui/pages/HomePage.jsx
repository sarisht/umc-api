import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Policies } from '../../api/policies.js';

class HomePage extends Component {
    renderPolicies() {
        return this.props.policies.map((policy) => {
            return (
                <a href="#" key={policy._id} className="collection-item">{policy.name} - {policy.amount} UMC</a>
            );
        });
    }

    renderLoggedIn() {
        return (
            <div className="section">
                <div className="row">
                    <div className="col s12">
                        <ul className="collection with-header">
                            <li className="collection-header">
                                <h4>My Policies</h4>
                            </li>
                            {this.renderPolicies()}
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <ul className="collection with-header">
                            <li className="collection-header"><h4>My Outstanding Claims</h4></li>
                            <li className="collection-item">NYI</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <ul className="collection with-header">
                            <li className="collection-header"><h4>Others' Claims</h4></li>
                            <li className="collection-item">NYI</li>
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
                { this.props.currentUser ? this.renderLoggedIn() : this.renderLoggedOut() }
            </div>
        );
    }
}

HomePage.propTypes = {
    policies: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('policies');

    return {
        policies: Policies.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
}, HomePage);