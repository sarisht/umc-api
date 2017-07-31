import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsWrapper.jsx';
import ClaimFilePage from '../pages/ClaimFilePage.jsx';
import PolicyAddPage from '../pages/PolicyAddPage.jsx';

$(document).ready(function(){
    $('.modal').modal();
});

class Nav extends Component {
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper container">
                        <a className="left brand-logo" href="/">Umbrella Coin</a>
                        <ul className="right">
                            { this.props.currentUser ?
                                <div>
                                    <li><a className="modal-trigger" href="#policyAddModal">Add Policy</a></li>
                                    <li><a className="modal-trigger" href="#claimFileModal">File Claim</a></li>
                                    <li><AccountsUIWrapper/></li>
                                </div> : <li><AccountsUIWrapper/></li>
                            }
                        </ul>
                    </div>
                </nav>
                <div id="policyAddModal" className="modal">
                    <div className="modal-content">
                        <PolicyAddPage/>
                    </div>
                </div>
                <div id="claimFileModal" className="modal">
                    <div className="modal-content">
                        <ClaimFilePage/>
                    </div>
                </div>
            </div>
        );
    }
}

Nav.propTypes = {
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, Nav);