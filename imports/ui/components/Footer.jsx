import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h5>When Life Happens</h5>
                            <p>We are a next generation insurance platform built on the Ethereum blockchain. Our goal is to provide value to our policyholders with residual benefits when life events happen.</p>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        <span>© 2017</span>
                    </div>
                </div>
            </footer>
        );
    }
}