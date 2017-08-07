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
            <div className="col l4 m6 s12">
                <div className="card claim-card">
                    <div className="card-content light-blue darken-1">
                        <div className="center-align"><i className="material-icons circle">directions_car</i></div>
                    </div>
                    <div className="card-content">
                        <div className="row">
                            <div className="col s12">
                                <span className="card-title">'{this.props.claim.policyName}' Claim</span>
                                <p>User is asking for {this.props.claim.ask} UMC.</p>
                            </div>
                        </div>
                        {/*this.props.currentUser._id !== this.props.claim.owner ?
                            <div className="row">
                                <div className="col s12">
                                    <h5>How do you vote?</h5>
                                    {this.renderVoteButton('Yes', VOTE_YES)}&nbsp;
                                    {this.renderVoteButton('No', VOTE_NO)}&nbsp;
                                    {this.renderVoteButton('Needs More Information', VOTE_NMI)}
                                </div>
                            </div>
                            : ''*/}
                        <div>

                        </div>
                    </div>
                    <div className="card-action">
                        <a className="white-text" href="#">View Claim</a>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title">Discussion<i className="material-icons right">close</i></span>
                        <div className="row">
                            <div className="col s12">
                                <form>
                                    <div className="input-field">
                                        <input type="text" placeholder="Join the discussion" />
                                    </div>
                                </form>
                                <p><strong>Nickname</strong><br/>Curabitur eget pretium elit. Suspendisse odio arcu, pulvinar eu tincidunt sed, viverra quis tellus.</p>
                                <br/>
                                <p><strong>Nickname</strong><br/>Curabitur eget pretium elit. Suspendisse odio arcu, pulvinar eu tincidunt sed, viverra quis tellus.</p>
                                <br/>
                                <p><strong>Nickname</strong><br/>Curabitur eget pretium elit. Suspendisse odio arcu, pulvinar eu tincidunt sed, viverra quis tellus.</p>
                                <br/>
                                <p><strong>Nickname</strong><br/>Curabitur eget pretium elit. Suspendisse odio arcu, pulvinar eu tincidunt sed, viverra quis tellus.</p>
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
    claim: PropTypes.object,
    currentUser: PropTypes.object,
    currentVote: PropTypes.number,
};

export default ClaimPageContainer =  createContainer((props) => {
    Meteor.subscribe('claims');

    return {
        currentUser: Meteor.user(),
        currentVote: (props.claim.votes[Meteor.userId()] !== undefined) ? props.claim.votes[Meteor.userId()] : -1,
    };
}, ClaimPage);