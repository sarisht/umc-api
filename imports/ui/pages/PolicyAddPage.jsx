import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class PolicyAddPage extends Component {
    handleSubmit(event) {
        event.preventDefault();

        // Get input
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const amount = ReactDOM.findDOMNode(this.refs.amountInput).value.trim();

        // Insert policy
        Meteor.call('policies.insert', name, amount);

        // Clear form
        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
        ReactDOM.findDOMNode(this.refs.amountInput).value = '';
    }

    render() {
        return (
            <div className="section">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <h4 className="col s12">Add Policy</h4>
                        <div className="input-field col m6 s12">
                            <input ref="nameInput" id="policyName" type="text"/>
                            <label htmlFor="policyName">Name</label>
                        </div>
                        <div className="input-field col m6 s12">
                            <input ref="amountInput" id="policyAmount" type="text"/>
                            <label htmlFor="policyAmount">Amount</label>
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
}
