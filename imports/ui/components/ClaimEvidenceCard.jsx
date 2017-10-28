import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import {ClaimFiles} from '../../api/claimFiles'

class ClaimEvidenceCard extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="card-title">Evidence</div>
                    {this.props.claimFile
                        ? <a href={this.props.claimFile.link()} download={true}>{this.props.claimFile.name}</a>
                        : <p>No evidence provided.</p>}
                </div>
            </div>
        );
    }
}

ClaimEvidenceCard.propTypes = {
    claim: React.PropTypes.object.isRequired,
    claimFile: React.PropTypes.object,
};

export default createContainer((props) => {
    Meteor.subscribe('files.claimFiles.all');

    return {
        claim: props.claim,
        claimFile: ClaimFiles.findOne({ _id: props.claim.claimFileId })
    };
}, ClaimEvidenceCard);