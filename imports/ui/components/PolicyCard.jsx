import React from 'react';

export default class PolicyCard extends React.Component {
    static renderMetric(metric, label) {
        return (
            <div className="col s6">
                <h1>{metric}</h1>
                <p className="text-secondary">{label}</p>
            </div>
        );
    }

    render() {
        return (
            <div className="policy-card card medium">
                <div className="card-header">
                    <div className="card-title">My Policy<i className="material-icons right">mode_edit</i></div>
                    <p className="text-secondary">Created July 31, 2017</p>
                </div>
                <div className="policy-card-stats card-content">
                    <div className="row">
                        {PolicyCard.renderMetric(500, 'UMC Put In')}
                        {PolicyCard.renderMetric(2500, 'UMC Max Payout')}
                        {PolicyCard.renderMetric(2500, 'UMC Payout Remaining')}
                        {PolicyCard.renderMetric(120000, 'UMC Float')}
                    </div>
                </div>
            </div>
        );
    }
}

PolicyCard.propTypes = {
    policy: React.PropTypes.object,
};