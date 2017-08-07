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
                        <a className="left brand-logo" href="/">
                            <div className="valign-wrapper">
                                <img src="https://static.wixstatic.com/media/0a69bd_7cca552ce8524e90915bd9fce092b812~mv2.png/v1/fill/w_496,h_486,al_c,usm_2.00_1.00_0.00/0a69bd_7cca552ce8524e90915bd9fce092b812~mv2.png"/>
                                Umbrella Coin
                            </div>
                        </a>
                        {/*
                                                            <li><a className="modal-trigger" href="#policyAddModal">Add Policy</a></li>
                                    <li><a className="modal-trigger" href="#claimFileModal">File Claim</a></li>*/}
                        <ul className="right">
                            { this.props.currentUser ?
                                <div>
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