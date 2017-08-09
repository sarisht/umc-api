import React from 'react';

export default class ClaimDiscussionCard extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Discussion</span>
                    <p className="flow-text">Posts will be here.</p>
                </div>
            </div>
        );
    }
}

ClaimDiscussionCard.propTypes = {
    claim: React.PropTypes.object.isRequired,
};