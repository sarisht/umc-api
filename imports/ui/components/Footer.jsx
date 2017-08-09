import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h5>When Life Happens</h5>
                            <p>Umbrella Coin is a next generation insurance platform built on the Ethereum blockchain. Our goal is to provide value to our policyholders with residual benefits when life events happen.</p>
                        </div>
                        <div className="col s12">
                            <h5>Learn More</h5>
                            <ul>
                                <li><a href="https://www.umbrellacoin.org/">Website</a></li>
                                <li><a href="https://github.com/umbrellacoin/umc/blob/master/documents/UMC.pdf">Whitepaper</a></li>
                                <li><a href="https://www.umbrellacoin.org/team">Team</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        <span>© 2017 by Umbrella Coin</span>
                        <a className="right" href="mailto:info@umbrellacoin.org">info@umbrellacoin.org</a>
                    </div>
                </div>
            </footer>
        );
    }
}