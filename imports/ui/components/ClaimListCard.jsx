import React from 'react';
import classnames from 'classnames';

import ClaimFileModal from './ClaimFileModal.jsx';

export default class ClaimListCard extends React.Component {
    handleFileClick(event) {
        event.preventDefault();
        $('#claimFileModal').modal('open');
    }

    renderClaim(claim) {
        return (
            <a key={claim._id} href={"/claims/" + claim._id} className="collection-item avatar">
                <i className="material-icons circle">directions_car</i>
                <span className="title">Auto Claim</span>
                <p className="text-secondary">{claim.ask} UMC</p>
            </a>
        );
    }

    renderEmpty() {
        return (
            <li className="collection-item text-secondary">No claims</li>
        );
    }

    render() {
        const buttonClassName = classnames({
            "btn-floating halfway-fab waves-effect waves-light": true,
            disabled: !this.props.policy,
        });

        return (
            <div>
                <div className="claim-list-card card medium">
                    <div className="card-header">
                        <a href="#" onClick={this.handleFileClick.bind(this)} className={buttonClassName}>
                            <i className="material-icons">add</i>
                        </a>
                        <div className="card-title">My Claims</div>
                    </div>
                    <ul className="collection">
                        {this.props.claims.length === 0 ? this.renderEmpty() : this.props.claims.map(this.renderClaim)}
                    </ul>
                </div>
                {this.props.policy ? <ClaimFileModal claims={this.props.claims} policy={this.props.policy}/> : null}
            </div>
        );
    }
}

ClaimListCard.propTypes = {
    claims: React.PropTypes.array.isRequired,
    policy: React.PropTypes.object,
};