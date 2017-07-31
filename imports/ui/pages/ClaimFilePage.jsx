import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Policies } from '../../api/policies.js';

class ClaimFilePage extends Component {
    handleSubmit(event) {
        event.preventDefault();

        // Get input
        const policyId = ReactDOM.findDOMNode(this.refs.policyInput).value;
        const ask = ReactDOM.findDOMNode(this.refs.askInput).value.trim();

        // Insert policy
        console.log(policyId + ', ' + ask);
        Meteor.call('claims.insert', policyId, ask);

        // Clear form
        ReactDOM.findDOMNode(this.refs.policyInput).value = '';
        ReactDOM.findDOMNode(this.refs.askInput).value = '';
    }

    renderPolicyOptions() {
        return this.props.policies.map((policy) => {
            return <option key={policy._id} value={policy._id}>{policy.name}</option>;
        });
    }

    renderHasPolicies() {
        return (
            <div className="section">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <h4 className="col s12">File Claim</h4>
                        <div className="col m6 s12">
                            <label>Select Policy</label>
                            <select ref="policyInput" className="browser-default" selected="">
                                <option value="" disabled>Select Policy</option>
                                {this.renderPolicyOptions()}
                            </select>
                        </div>
                        <div className="input-field col m6 s12">
                            <input ref="askInput" id="claimAsk" type="text"/>
                            <label htmlFor="claimAsk">Ask</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className="modal-action modal-close btn waves-effect waves-light" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    static renderNoPolicies() {
        return <h4>You don't have any policies to file a claim with.</h4>;
    }

    render() {
        return (
            <div className="section">
                { this.props.policies.length ? this.renderHasPolicies() : ClaimFilePage.renderNoPolicies() }
            </div>
        );
    }
}


ClaimFilePage.propTypes = {
    policies: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('policies');

    return {
        policies: Policies.find({}, { sort: { name: 1 } }).fetch(),
    };
}, ClaimFilePage);
