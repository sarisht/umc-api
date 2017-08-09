import React from 'react';

import ClaimFileModal from './ClaimFileModal.jsx';

export default class ClaimListCard extends React.Component {
    renderClaim(claim) {
        return (
            <a key={claim._id} href={"/claims/" + claim._id} className="collection-item avatar">
                <i className="material-icons circle">directions_car</i>
                <span className="title">Auto Claim</span>
                <p className="text-secondary">{claim.ask} UMC</p>
            </a>
        );
    }

    render() {
        return (
            <div>
                <div className="claim-list-card card medium">
                    <div className="card-header">
                        <a href="#claimFileModal" className="modal-trigger btn-floating halfway-fab waves-effect waves-light">
                            <i className="material-icons">add</i>
                        </a>
                        <div className="card-title">My Claims</div>
                    </div>
                    <ul className="collection">
                        {this.props.claims.map(this.renderClaim)}
                    </ul>
                </div>
                <ClaimFileModal/>
            </div>
        );
    }
}

ClaimListCard.propTypes = {
    claims: React.PropTypes.array.isRequired,
};