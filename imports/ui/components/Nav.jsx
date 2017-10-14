import React from 'react';

import AccountsWrapper from './AccountsWrapper.jsx';

export default class Nav extends React.Component {
    showSideNav(event) {
        event.preventDefault();

        let buttonCollapse = $('.button-collapse');
        buttonCollapse.sideNav();
        buttonCollapse.sideNav('show');
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <ul className="right">
                        <li><AccountsWrapper/></li>
                    </ul>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/notifications">Notifications</a></li>
                        <li><a href="/umc-wallet">UMC Wallet</a></li>
                        <li><a href="/">Dashboard</a></li>
                    </ul>
                    <ul id="nav-mobile" className="side-nav">
                        <li><a href="/notifications">Notifications</a></li>
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