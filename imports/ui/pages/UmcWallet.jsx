    import React, { Component, PropTypes } from 'react';
    import { Meteor } from 'meteor/meteor';
    import { createContainer } from 'meteor/react-meteor-data';
    import classnames from 'classnames';

    import {categoryToIcon} from "../../helpers/categoryHelper"
    import { Claims } from '../../api/claims.js';
    import { Policies } from '../../api/policies.js';
    import { Wallet } from '../../api/wallet.js';
    import ClaimCard from '../components/ClaimCard.jsx';
    import ClaimListCard from '../components/ClaimListCard.jsx';
    import PolicyCard from '../components/PolicyCard.jsx';



    class UmcWallet extends Component {
        
        address(){
            return this.props.wallet;
        }

        handleFileClick(event) {
            event.preventDefault();
            var address = Math.floor(Math.random()*900000) + 100000;
            var balance = 0;
            Meteor.call('wallet.insert', address, balance);
        }

        handleFileClickforSend(event) {
            console.log("f");
            event.preventDefault();
            var email =  this.refs.email.value.trim();
            var amount =  parseInt(this.refs.amount.value.trim());
            
            let res = this.address();
            id = res[0]._id;
            address = res[0].wallet;
           
           
            Meteor.call('wallet.update',id,amount,address,email);
        }

        renderLoggedInWithWallet() {
            let res = this.address();
            return (
                <div className="section">
                    <h3> Wallet</h3>
                    <div className="row">
                        <div className="col s12">
                        UMC Wallet Address: {res[0].wallet}
                        </div>
                        <br/>
                        <div className="col s12">
                        UMC Wallet Balance: {res[0].balance}
                        </div>
                        <br/>
                        <div className="col s12">
                        Add/Withdraw Balance
                        </div>
                        <br/>
                        <div className="col s2">
                        <h5>Send UMC coins</h5>
                        <form onSubmit={this.handleFileClickforSend.bind(this)}>
                            <div>
                                <label htmlFor="email">Email Address</label>
                                <input type="email" ref="email" placeholder="Receiver's Email Address"/>
                            </div>
                            <div>
                                <label htmlFor="amount">Amount</label>
                                <input type="number" ref="amount" placeholder="Amount"/>
                            </div>
                            <div>
                                <button className="btn-large waves-effect waves-light" type="submit">Send</button>
                            </div>
                            <br/>
                        </form>
                        </div>
                        <br/>
                        <div className="col s4">
                        <h5>Request UMC coins</h5>
                        <form onSubmit={this.handleFileClickforSend.bind(this)}>
                            <div>
                                <label htmlFor="email">Email Address</label>
                                <input type="email" ref="email" placeholder="Receiver's Email Address"/>
                            </div>
                            <div>
                                <button className="btn-large waves-effect waves-light" type="submit">Request</button>
                            </div>
                            <br/>
                        </form>
                        </div>
                    </div>
                </div>
            );
        }

        renderLoggedInWithoutWallet() {
        
            return (
                <div className="section">
                    <div className="col s4">
                    Add Wallet
                    <a href="#" onClick={this.handleFileClick.bind(this)}>
                    <i className="material-icons">add</i>
                    </a>
                    </div>
                </div>
            );
        }

        renderLoggedIn(){
            console.log(this.props.wallet);
            return this.props.wallet.length>0 ? this.renderLoggedInWithWallet() : this.renderLoggedInWithoutWallet();
        }

        renderLoggedOut() {
            return (
                <div className="section">
                    <h4>Please log in </h4>
                    
                </div>
            );
        }

        render() {
            console.log(this.props.curentUser);
            return this.props.currentUser ? this.renderLoggedIn() : this.renderLoggedOut();
        }
    }

    UmcWallet.propTypes = {
        claims: PropTypes.array.isRequired,
        communityClaims: PropTypes.array.isRequired,
        currentUser: PropTypes.object,
        policy: PropTypes.object,
        wallet: React.PropTypes.object,
    };

    export default createContainer(() => {
        
        Meteor.subscribe('claims');
        Meteor.subscribe('policies');
        Meteor.subscribe('wallet');
        return {
            communityClaims: Claims.find({ owner: { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } }).fetch(),
            claims: Claims.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
            currentUser: Meteor.user(),
            policy: Policies.findOne({ owner: Meteor.userId() }),
            wallet: Wallet.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        };
    }, UmcWallet);