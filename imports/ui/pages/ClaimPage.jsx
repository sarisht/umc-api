import { Meteor } from 'meteor/meteor';
import React from 'react';
import classnames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';

import ClaimEvidenceCard from '../components/ClaimEvidenceCard.jsx';
import ClaimDiscussionCard from '../components/ClaimDiscussionCard.jsx';

import { Claims, VOTE_YES, VOTE_NO, VOTE_NMI } from "../../api/claims.js";

class ClaimPage extends React.Component {
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

    renderVoteButtons() {
        return (
            <div className="col s12">
                <h5>How do you vote?</h5>
                <form>
                    {this.renderVoteButton('Yes', VOTE_YES)}
                    {this.renderVoteButton('No', VOTE_NO)}
                    {this.renderVoteButton('Needs More Information', VOTE_NMI)}
                </form>
            </div>
        );
    }

    renderDetailCard() {
        return (
            <div className="claim-detail-card card">
                <div className="card-header">
                    <span className="card-title">Auto Claim</span>
                    <p className="text-secondary">Added 8/20/2017</p>
                </div>
                <div className="card-content">
                    <div className="row">
                        <div className="col s12">
                            <p>{this.props.claim.ask} UMC</p>
                            <p>In in culpa nulla elit esse. Ex cillum enim aliquip sit sit ullamco ex eiusmod fugiat. Cupidatat ad minim officia mollit laborum magna dolor tempor cupidatat mollit. Est velit sit ad aliqua ullamco laborum excepteur dolore proident incididunt in labore elit.</p>
                        </div>
                        {this.props.currentUser._id !== this.props.claim.owner ? this.renderVoteButtons() : null}
                    </div>
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
                            <div className="col s12">
                                <ClaimDiscussionCard claim={this.props.claim} />
                            </div>
                        </div>
                    </div>
                    <div className="col s12 l4">
                        <ClaimEvidenceCard claim={this.props.claim} />
                        <ClaimEvidenceCard claim={this.props.claim} />
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