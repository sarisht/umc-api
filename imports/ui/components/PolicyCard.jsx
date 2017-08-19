import React from 'react';
import { moment } from "meteor/momentjs:moment";

export default class PolicyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inEdit: false };
    }

    handleEdit() {
        this.setState({ inEdit: !this.state.inEdit });
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
                    {PolicyCard.renderMetric(500, 'UMC Put In')}
                    {PolicyCard.renderMetric(2500, 'UMC Max Payout')}
                    {PolicyCard.renderMetric(2500, 'UMC Payout Remaining')}
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
                <h2>Add funds or delete your policy for a fee.</h2>
                <form>
                    <div className="row">
                        <div className="input-field col s8">
                            <input placeholder="Enter Additional Funds (UMC)" type="text" />
                        </div>
                        <div className="input-field col s12">
                            <button className="btn-large waves-effect waves-light" type="submit">Add Coverage</button>&nbsp;
                            <button className="btn-flat btn-large">Delete Policy</button>
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
                <form>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input placeholder="Enter Funds (UMC)" type="text" />
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

        const editIcon = this.state.inEdit ? "close" : "mode_edit";

        return (
            <div className="card-header">
                <div className="card-title">
                    {this.state.inEdit ? "Edit My Policy" : "My Policy"}
                    <i onClick={this.handleEdit.bind(this)} className="material-icons right">{editIcon}</i>
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