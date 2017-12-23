import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React from 'react';

import { Claims } from '../../api/claims.js';
import ClaimListCard from '../components/ClaimListCard.jsx';

class UserHistoryPage extends React.Component {
    render() {
        return (
            <div className="section">
                <div className="row">
                    <div className="col s12 l4">
                        <ClaimListCard claims={this.props.claims} isOwner={false}/>
                    </div>
                </div>
            </div>
        );
    }
}

UserHistoryPage.propTypes = {
    claims: React.PropTypes.array.isRequired,
};

export default createContainer((props) => {
    Meteor.subscribe('claims');

    return {
        claims: Claims.find({ owner: props.match.params.id }, { sort: { createdAt: -1 } }).fetch(),
    };
}, UserHistoryPage);