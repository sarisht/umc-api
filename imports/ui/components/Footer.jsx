import React from 'react';

export const Footer = () => (
    <footer className="page-footer">
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <h5 className="white-text">When Life Happens</h5>
                    <p className="grey-text text-lighten-4">Umbrella Coin is a next generation insurance platform built on the Ethereum blockchain. Our goal is to provide value to our policyholders with residual benefits when life events happen.</p>
                </div>
                <div className="col s12">
                    <h5 className="white-text">Learn More</h5>
                    <ul>
                        <li><a className="grey-text text-lighten-3" href="https://www.umbrellacoin.org/">Website</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://github.com/umbrellacoin/umc/blob/master/documents/UMC.pdf">Whitepaper</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://www.umbrellacoin.org/team">Team</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
                © 2017 by Umbrella Coin
                <a className="grey-text text-lighten-4 right" href="mailto:info@umbrellacoin.org">info@umbrellacoin.org</a>
            </div>
        </div>
    </footer>
);