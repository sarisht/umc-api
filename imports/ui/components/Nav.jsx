import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import AccountsWrapper from './AccountsWrapper.jsx';
import {Notifications} from '../../api/notifications.js';
import { Claims } from '../../api/claims.js';
class Nav extends React.Component {
    showSideNav(event) {
        event.preventDefault();

        let buttonCollapse = $('.button-collapse');
        buttonCollapse.sideNav();
        buttonCollapse.sideNav('show');
    }

    renderNotificationLink() {
        return (
            <a href="/notifications">Notifications
                {this.props.notifications.length !== 0 ?
                    <span className="new badge">{this.props.notifications.length}</span> : null}
            </a>
        );
    }

    renderResults(){
        return (
            <a href="/results">Results
                {this.props.claims.length !== 0 ?
                    <span className="new badge">{this.props.claims.length}</span> : null}
            </a>
        );
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <ul className="right">
                        <li><AccountsWrapper/></li>
                    </ul>
                    <ul className="right hide-on-med-and-down">
                        <li>{this.renderResults()}</li>
                        <li>{this.renderNotificationLink()}</li>
                        <li><a href="/umc-wallet">UMC Wallet</a></li>
                        <li><a href="/">Dashboard</a></li>
                    </ul>
                    <ul id="nav-mobile" className="side-nav">
                        <li>{this.renderResults()}</li>
                        <li>{this.renderNotificationLink()}</li>
                        <li><a href="/umc-wallet">UMC Wallet</a></li>
                        <li><a href="/">Dashboard</a></li>
                    </ul>
                    <a href="#" onClick={this.showSideNav.bind(this)} data-activates="nav-mobile"
                       className="button-collapse"><i className="material-icons">menu</i></a>
                </div>
            </nav>
        );
    }
}

Nav.propTypes = {
    notifications: React.PropTypes.array,
    claims: React.PropTypes.array,
};

export default createContainer(() => {
    Meteor.subscribe('notifications');
    Meteor.subscribe('claims');
    return {
        notifications: Notifications.find({user: Meteor.userId()}).fetch(),
        claims: Claims.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
    };
}, Nav);