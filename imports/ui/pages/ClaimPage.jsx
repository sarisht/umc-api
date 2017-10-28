import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { moment } from "meteor/momentjs:moment";

import {categoryToIcon} from "../../helpers/categoryHelper"
import ClaimEvidenceCard from '../components/ClaimEvidenceCard.jsx';
import ClaimDiscussionCard from '../components/ClaimDiscussionCard.jsx';
import StatCard from '../components/StatCard.jsx';

import { Claims, VOTE_YES, VOTE_NO, VOTE_NMI, VOTE_FRAUD, VOTE_INAPPROPRIATE } from "../../api/claims.js";
import {VOTE_INNAPROPRIATE} from "../../api/claims";

class ClaimPage extends React.Component {
    isOwner() {
        return this.props.currentUser && this.props.currentUser._id === this.props.claim.owner;
    }

    handleVoteChange(vote, event) {
        Meteor.call('claims.vote', this.props.claim._id, vote);
    }

    renderVoteButton(text, vote) {
        const id = "vote" + vote;
        const checked = (vote === this.props.currentVote) ? "checked" : "";

        return (
            <div>
                <input onChange={this.handleVoteChange.bind(this, vote)} type="radio" id={id} checked={checked} />
                <label htmlFor={id}>{text}</label>
            </div>
        );
    }

    check(){
        // console.log(this.props.currentUser);
        // console.log(this.props.claim.eligible_voters);
        var userid = this.props.currentUser._id;
        var voters = this.props.claim.eligible_voters;
        if (!voters)
            return false;

        for(i = 0; i < voters.length; i++){
            if(voters[i] === userid)return true;
        }

        return false;
    }
    renderVoteButtons() {
        if(this.check()){
            return (
                <div className="claim-vote-card card">
                    <div className="card-content">
                        <h5>How do you vote?</h5>
                        <form>
                            {this.renderVoteButton('Yes', VOTE_YES)}
                            {this.renderVoteButton('No', VOTE_NO)}
                            {this.renderVoteButton('Needs More Information', VOTE_NMI)}
                            <div className="divider" />
                            {this.renderVoteButton('Fraudulent', VOTE_FRAUD)}
                            {this.renderVoteButton('Inappropriate', VOTE_INAPPROPRIATE)}
                        </form>
                    </div>
                </div>
            );
        }
    }

    renderDetailCard() {
        return (
            <div className="claim-detail-card card">
                <div className="card-header">
                    <span className="card-title">
                        {this.props.claim.title}
                        {this.isOwner() ? <i className="material-icons right">mode_edit</i> : null}
                    </span>
                </div>
                <div className="card-content">
                    <p className="text-secondary right">{moment(this.props.claim.createdAt).format('MMM D')}</p>
                    <div className="avatar">
                        <i className="material-icons circle">person</i>
                        <span>Gingerbread Man</span>
                        <p className="text-secondary">cd2a3d9f938e13cd947ec05abc7fe734df8dd826</p>
                    </div>
                    <p className="claim-description">{this.props.claim.description}</p>
                </div>
            </div>
        );
    }

    renderLoaded() {
        return (
            <div className="section">
                <div className="row">
                    <div className="col s12 l8">
                        <div className="row">
                            <div className="col s12">
                                {this.renderDetailCard()}
                            </div>
                            <div className="col s6">
                                <StatCard caption="UMC Ask" metric={this.props.claim.ask} />
                            </div>
                            <div className="col s6">
                                <StatCard caption={this.props.claim.category + " category"} icon={categoryToIcon(this.props.claim.category)} />
                            </div>
                            <div className="col s12">
                                <ClaimDiscussionCard claim={this.props.claim} />
                            </div>
                        </div>
                    </div>
                    <div className="col s12 l4">
                        <div className="row">
                            <div className="col s12">
                                {(Meteor.userId() && !this.isOwner()) ? this.renderVoteButtons() : null}
                            </div>
                            <div className="col s12">
                                <ClaimEvidenceCard claim={this.props.claim} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this.props.claim ? this.renderLoaded() : null;
    }
}

ClaimPage.propTypes = {
    claim: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    currentVote: React.PropTypes.number,
};

export default ClaimPageContainer =  createContainer((props) => {
    Meteor.subscribe('claims');

    const claim = Claims.findOne(props.match.params.id);
    const currentVote = (claim && claim.votes[Meteor.userId()] !== undefined) ? claim.votes[Meteor.userId()] : -1;

    return {
        claim,
        currentUser: Meteor.user(),
        currentVote,
    };
}, ClaimPage);