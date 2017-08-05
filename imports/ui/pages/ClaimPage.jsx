import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import { Claims, VOTE_YES, VOTE_NO, VOTE_NMI } from "../../api/claims.js";

class ClaimPage extends Component {
    handleVoteClick(vote) {
        Meteor.call('claims.vote', this.props.claim._id, vote);
    }

    renderVoteButton(text, vote) {
        console.log(vote + "," + this.props.currentVote);
        const buttonClassName = classnames({
            'disabled': vote === this.props.currentVote,
            'waves-effect waves-light btn': true,
        });

        return (
            <a onClick={this.handleVoteClick.bind(this, vote)} className={buttonClassName}>{text}</a>
        );
    }

    renderLoaded() {
        return (
            <div className="section">
                <div className="row">
                    <div className="card col s12">
                        <div className="card-content">
                            <div className="row">
                                <div className="col s12">
                                    <h4>This is a claim for '{this.props.claim.policyName}' policy.</h4>
                                    <p>User is asking for {this.props.claim.ask} UMC. Evidence would be here.</p>
                                </div>
                            </div>
                            {this.props.currentUser._id !== this.props.claim.owner ?
                                <div className="row">
                                    <div className="col s12">
                                        <h5>How do you vote?</h5>
                                        {this.renderVoteButton('Yes', VOTE_YES)}&nbsp;
                                        {this.renderVoteButton('No', VOTE_NO)}&nbsp;
                                        {this.renderVoteButton('Needs More Information', VOTE_NMI)}
                                    </div>
                                </div>
                                : ''}
                            <div className="row">
                                <div className="col s12">
                                    <h5>Discussion</h5>
                                    <form>
                                        <div className="input-field">
                                            <input type="text" placeholder="Join the discussion" />
                                        </div>
                                    </form>
                                    <strong>Nickname</strong>
                                    <p>Curabitur eget pretium elit. Suspendisse odio arcu, pulvinar eu tincidunt sed, viverra quis tellus. Etiam elementum feugiat arcu, et egestas turpis tempor eu. Mauris id nunc ut metus pretium finibus eu vitae odio. Duis interdum tellus eu volutpat commodo. Vestibulum venenatis mi nunc, ut congue ex pulvinar sed. Etiam pulvinar orci nec venenatis viverra.</p>
                                    <br/>
                                    <strong>Nickname</strong>
                                    <p>Curabitur eget pretium elit. Suspendisse odio arcu, pulvinar eu tincidunt sed, viverra quis tellus. Etiam elementum feugiat arcu, et egestas turpis tempor eu. Mauris id nunc ut metus pretium finibus eu vitae odio. Duis interdum tellus eu volutpat commodo. Vestibulum venenatis mi nunc, ut congue ex pulvinar sed. Etiam pulvinar orci nec venenatis viverra.</p>
                                    <br/>
                                    <strong>Nickname</strong>
                                    <p>Curabitur eget pretium elit. Suspendisse odio arcu, pulvinar eu tincidunt sed, viverra quis tellus. Etiam elementum feugiat arcu, et egestas turpis tempor eu. Mauris id nunc ut metus pretium finibus eu vitae odio. Duis interdum tellus eu volutpat commodo. Vestibulum venenatis mi nunc, ut congue ex pulvinar sed. Etiam pulvinar orci nec venenatis viverra.</p>
                                    <br/>
                                    <strong>Nickname</strong>
                                    <p>Curabitur eget pretium elit. Suspendisse odio arcu, pulvinar eu tincidunt sed, viverra quis tellus. Etiam elementum feugiat arcu, et egestas turpis tempor eu. Mauris id nunc ut metus pretium finibus eu vitae odio. Duis interdum tellus eu volutpat commodo. Vestibulum venenatis mi nunc, ut congue ex pulvinar sed. Etiam pulvinar orci nec venenatis viverra.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>{this.props.claim ? this.renderLoaded() : ''}</div>
        );
    }
}

ClaimPage.propTypes = {
    loading: PropTypes.bool,
    claim: PropTypes.object,
    currentUser: PropTypes.object,
    currentVote: PropTypes.number,
};

export default ClaimPageContainer =  createContainer((props) => {
    const claimsHandle = Meteor.subscribe('claims');
    const loading = !claimsHandle.ready();
    const claim = Claims.findOne(props.match.params.id);
    const currentVote = (claim && claim.votes[Meteor.userId()] !== undefined) ? claim.votes[Meteor.userId()] : -1;

    return {
        loading,
        claim,
        currentUser: Meteor.user(),
        currentVote,
    };
}, ClaimPage);