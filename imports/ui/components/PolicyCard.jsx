import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { moment } from "meteor/momentjs:moment";

export default class PolicyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inEdit: false };
    }

    handleEdit() {
        this.setState({ inEdit: !this.state.inEdit });
    }

    handleDelete() {
        if (confirm("Deleting your policy will also delete any outstanding claims. Are you sure?"))
            Meteor.call('policies.deactivate', this.props.policy._id, false);
    }

    handleSubmit(event) {
        event.preventDefault();

        // Get input
        const amount_in_USD = parseInt(ReactDOM.findDOMNode(this.refs.amountInput).value);

        //Converting the amount into UMC
        const amount = 0.5*amount_in_USD; 
        if (isNaN(amount) || amount <= 0)
            return;

        // Insert policy
        if (!this.props.policy)
            Meteor.call('policies.insert', amount);
        else
            Meteor.call('policies.addFunds', this.props.policy._id, amount);

        // Reset state
        this.setState({ inEdit: false });

        // Reset input
        ReactDOM.findDOMNode(this.refs.amountInput).value = '';
    }

    static renderMetric(metric, label) {
        return (
            <div className="col s6">
                <h1>{metric}</h1>
                <p className="text-secondary">{label}</p>
            </div>
        );
    }

    renderStats() {
        return (
            <div className="policy-card-stats card-content">
                <div className="row">
                    {PolicyCard.renderMetric(this.props.policy.amount, 'UMC Put In')}
                    {PolicyCard.renderMetric(this.props.policy.payoutMax, 'UMC Max Payout')}
                    {PolicyCard.renderMetric(this.props.policy.payoutRemaining, 'UMC Payout Remaining')}
                    {PolicyCard.renderMetric(120000, 'UMC Float')}
                </div>
            </div>
        );
    }
    
    renderEditPolicyForm() {
        return (
            <div className="edit-policy card-content">
                <div className="card-title">
                    <i onClick={this.handleEdit.bind(this)} className="material-icons right">close</i>
                </div>
                <h3>Add funds or delete your policy for a fee.</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="input-field col s8">
                            <input ref="amountInput" placeholder="Enter Additional Funds (USD)" type="text" />
                            
                        </div>
                        
                            
                       
                        <div className="input-field col s12">
                            <button type="submit" className="btn-large waves-effect waves-light">Add Coverage</button>&nbsp;
                            <button onClick={this.handleDelete.bind(this)} className="btn-flat btn-large">Delete Policy</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    renderNoPolicyForm() {
        return (
            <div className="no-policy card-content">
                <h1>Add funds to get coverage.</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input ref="amountInput" placeholder="Enter Funds (UMC)" type="text" />
                        </div>
                        <div className="input-field col s12 m6">
                            <button className="btn waves-effect waves-light btn-large" type="submit">Get Covered</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    renderContent() {
        if (!this.props.policy)
            return this.renderNoPolicyForm();
        if (this.state.inEdit)
            return this.renderEditPolicyForm();
        return this.renderStats();
    }

    renderHeader() {
        if (!this.props.policy || this.state.inEdit)
            return null;

        return (
            <div className="card-header">
                <div className="card-title">
                    My Policy
                    <i onClick={this.handleEdit.bind(this)} className="material-icons right">mode_edit</i>
                </div>
                <p className="text-secondary">Created {moment(this.props.policy.createdAt).format('MMMM D, YYYY')}</p>
            </div>
        );
    }

    render() {
        return (
            <div className="policy-card card medium">
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        );
    }
}

PolicyCard.propTypes = {
    policy: React.PropTypes.object,
};