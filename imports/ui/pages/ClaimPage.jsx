import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Claims } from "../../api/claims.js";
import { Policies } from '../../api/policies.js';

class ClaimPage extends Component {
    renderLoaded() {
        return (
            <div className="section">
                <div className="row">
                    <div className="card col s12">
                        <div className="card-content">
                            <div className="row">
                                <div className="col s12">
                                    <h4>This is a claim for '{this.props.policy.name}' policy.</h4>
                                    <p>User is asking for {this.props.claim.ask} UMC. Evidence would be here.</p>
                                </div>
                            </div>
                            {this.props.currentUser._id !== this.props.claim.owner ?
                                <div className="row">
                                    <div className="col s12">
                                        <h5>How do you vote?</h5>
                                        <a className="waves-effect waves-light btn">Yes</a>&nbsp;
                                        <a className="waves-effect waves-light btn">No</a>&nbsp;
                                        <a className="waves-effect waves-light btn">Needs More Information</a>
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
    claim: PropTypes.object,
    policy: PropTypes.object,
    currentUser: PropTypes.object,
};

export default createContainer((props) => {
    Meteor.subscribe('claims');
    Meteor.subscribe('policies');

    let claim, policy;

    claim = Claims.findOne(props.match.params.id);
    if (claim) {
        policy = Policies.findOne({_id: claim.policyId});
    }

    return {
        claim,
        policy,
        currentUser: Meteor.user(),
    };
}, ClaimPage);