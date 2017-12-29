import React from 'react';
import classnames from 'classnames';

import {categoryToIcon} from "../../helpers/categoryHelper"
import ClaimFileModal from './ClaimFileModal.jsx';
import Time from 'react-time';
import { Meteor } from 'meteor/meteor';
import { moment } from "meteor/momentjs:moment";

export default class ClaimListCard extends React.Component {
    handleFileClick(event) {
        event.preventDefault();
        $('#claimFileModal').modal('open');
    }

    renderClaim(claim) {
        return (
            <a key={claim._id} href={"/claims/" + claim._id} className="collection-item avatar">
                <i className="material-icons circle">{categoryToIcon(claim.category)}</i>
                <span className="title">{claim.title}</span>
                <p className="text-secondary">{claim.ask} UMC</p>
            </a>
        );
    }

    renderEmpty() {
        return (
            <li className="collection-item text-secondary">No claims</li>
        );
    }

    renderAddButton() {
        const claim_add = this.props.policy;
        const cool_down = false;
        var cool_down_period = 90;
        //compare current date and policy's date
        if(this.props.policy){
            //console.log(this.props.policy.createdAt);
            let then = this.props.policy.createdAt;
            let now = new Date();
            //console.log(now);
            var v = moment(now).diff(then, 'days');
            //console.log(v);
            if(v > cool_down_period){
                cool_down = true;
            }
        }
        claim_add = claim_add && cool_down;
        const buttonClassName = classnames({
            "btn-floating halfway-fab waves-effect waves-light": true,
            disabled: !claim_add,
        });

        return (
            <a href="#" onClick={this.handleFileClick.bind(this)} className={buttonClassName}>
                <i className="material-icons">add</i>
            </a>
        );
    }

    render() {
        return (
            <div>
                <div className="claim-list-card card medium">
                    <div className="card-header">
                        {this.props.isOwner ? this.renderAddButton() : null}
                        <div className="card-title">{this.props.isOwner ? "My Claims" : "Claims"}</div>
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
    isOwner: React.PropTypes.bool.isRequired,
    policy: React.PropTypes.object,
};