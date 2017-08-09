import React from 'react';

import AccountsWrapper from './AccountsWrapper.jsx';

export default class Nav extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <a className="brand-logo left" href="/">
                        <div className="valign-wrapper">
                            <img src="https://static.wixstatic.com/media/0a69bd_7cca552ce8524e90915bd9fce092b812~mv2.png/v1/fill/w_496,h_486,al_c,usm_2.00_1.00_0.00/0a69bd_7cca552ce8524e90915bd9fce092b812~mv2.png" />
                            <span>Umbrella Coin</span>
                        </div>
                    </a>
                    <div className="right">
                        <AccountsWrapper />
                    </div>
                </div>
            </nav>
        );
    }
}