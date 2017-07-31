import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class PolicyAddPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameInvalid: false,
            amountInvalid: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        // Reset form
        this.setState({ nameInvalid: false, amountInvalid: false, });

        // Get name
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        if (name === '') {
            this.setState({ nameInvalid: true });
            return;
        }

        // Get amount
        const amount = parseInt(ReactDOM.findDOMNode(this.refs.amountInput).value.trim());
        if (isNaN(amount) || amount <= 0) {
            this.setState({ amountInvalid: true });
            return;
        }

        // Insert policy
        Meteor.call('policies.insert', name, amount);

        // Clear form
        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
        ReactDOM.findDOMNode(this.refs.amountInput).value = '';

        // Close modal
        $('#policyAddModal').modal('close');
    }

    render() {
        return (
            <div className="section">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <h4 className="col s12">Add Policy</h4>
                        <div className="input-field col m6 s12">
                            <input className={this.state.nameInvalid ? "invalid" : ""}
                                   ref="nameInput" id="policyName" type="text"/>
                            <label htmlFor="policyName">Name</label>
                        </div>
                        <div className="input-field col m6 s12">
                            <input className={this.state.amountInvalid ? "invalid" : ""}
                                   ref="amountInput" id="policyAmount" type="text"/>
                            <label htmlFor="policyAmount">Amount</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className="btn waves-effect waves-light" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
