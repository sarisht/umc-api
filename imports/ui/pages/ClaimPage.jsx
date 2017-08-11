import { Meteor } from 'meteor/meteor';
import React from 'react';
import classnames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';

import ClaimDiscussionCard from '../components/ClaimDiscussionCard.jsx';

import { Claims, VOTE_YES, VOTE_NO, VOTE_NMI } from "../../api/claims.js";

class ClaimPage extends React.Component {
    handleVoteClick(vote) {
        Meteor.call('claims.vote', this.props.claim._id, vote);
    }

    renderVoteButton(text, vote) {
        const buttonClassNames = classnames({
            'disabled': vote === this.props.currentVote,
            'waves-effect waves-light btn': true,
        });

        return (
            <a onClick={this.handleVoteClick.bind(this, vote)} className={buttonClassNames}>{text}</a>
        );
    }

    renderVoteButtons() {
        return (
            <div className="col s12">
                <h5>How do you vote?</h5>
                {this.renderVoteButton('Yes', VOTE_YES)}&nbsp;
                {this.renderVoteButton('No', VOTE_NO)}&nbsp;
                {this.renderVoteButton('Needs More Information', VOTE_NMI)}
            </div>
        );
    }

    renderDetailCard() {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <div className="col s12">
                            <h4>Auto Claim</h4>
                            <p>{this.props.claim.ask} UMC</p>
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
                    <div className="col s12 l6">
                        {this.renderDetailCard()}
                    </div>
                    <div className="col s12 l6">
                        <ClaimDiscussionCard claim={this.props.claim} />
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