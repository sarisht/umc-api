import React from 'react';

export default class ClaimCard extends React.Component {
    render() {
        return (
            <div className="claim-card card">
                <div className="card-header">
                    <span><i className="material-icons circle">directions_car</i></span>
                </div>
                <div className="card-content">
                    <span className="card-title">Auto Claim</span>
                    <p className="text-secondary">{this.props.claim.ask} UMC</p>
                </div>
                <div className="card-action">
                    <a href={"/claims/" + this.props.claim._id}>View Claim</a>
                </div>
            </div>
        );
    }
}

ClaimCard.propTypes = {
    claim: React.PropTypes.object.isRequired,
};