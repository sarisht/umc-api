import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import {categoryToIcon} from "../../helpers/categoryHelper"
import { Claims } from '../../api/claims.js';
import { Policies } from '../../api/policies.js';
import { Wallet } from '../../api/wallet.js';
import { Notifications } from '../../api/notifications.js';
import ClaimCard from '../components/ClaimCard.jsx';
import ClaimListCard from '../components/ClaimListCard.jsx';
import PolicyCard from '../components/PolicyCard.jsx';
import { moment } from "meteor/momentjs:moment";

var abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "floatHolder",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var myContract = web3.eth.contract(abi);
var umc = "0x125e7343a671d134a55782ae147bfddbd3c6bc04";
var pool = "0x875e5742c36413f04d66baa84a3209ad970f3c6f";


class ResultsPage extends Component {
    
    renderClaim(claim,status) {
        return (
            <ul><a key={claim._id} href={"/claims/" + claim._id} className="collection-item avatar">
                <i className="material-icons circle">{categoryToIcon(claim.category)}</i>
                <span className="title">{claim.title}</span>
                <p className="text-secondary">{claim.ask} UMC</p>
            </a>
            </ul>
        );
    }
    
    checkStatus(claim){
        if(claim.active == false){
            return 0;
        }

        //if it expires now, check the votecount,tranfer umc or not and set claim's active to be false

        let then = claim.createdAt;
        let now = new Date();
        //console.log(now);
        var time = moment(now).diff(then, 'seconds');
        var claim_expire_period = 600; //as of now, 6 months
        //console.log(v);
        if(time > claim_expire_period){
            //it expires now

            //Deactivate the claims
            Meteor.call('claims.setActive', claim._id, false);

            //check the votecount
            var map = claim.VoteCounts;
            //if it wins
            if(map[VOTE_YES].length > 0.5 * map.length){

                    //Interface to transfer from pool's wallet to user's wallet//
                    let res = this.props.wallet;
                    console.log(res);
                    receiver= res[0].wallet;
                    console.log(receiver);
                    web3.eth.defaultAccount = pool;
                    web3.personal.unlockAccount(pool,'!@superpassword',5);
                    var contract_data = myContract.at(umc);
                    contract_data.transfer(receiver,ask);
                    //end//
            }
            
        
            return 0;
        }
        //else return 1
        return 1;
    }

    all_claims(){
        var rows = [];
        for (var i=0; i < claims.length; i++) {
            //set vstatus if this claims has expired, then->inactive(0), otherwise->active(1)
            var vstatus = this.checkStatus(claim);

            rows.push(this.renderClaim(claims[i]),status);
        }
        return <tbody>{rows}</tbody>;
    }
    

    
    renderEmpty() {
        return (
            <li className="collection-item text-secondary">No Claims yet</li>
        );
    }
    renderLoggedIn(){
        
        return (
            <div>
                <center><h4>Results</h4></center>
            <div className="claim-list-card card medium">
                <ul className="collection">
                    {this.props.claims.length === 0  ? this.renderEmpty() : this.all_claims()}
                </ul>
            </div>
        </div>
        );
    }

    renderLoggedOut() {
        return (
            <div className="section">
                <h4>Please log in to check the results. </h4>
                
            </div>
        );
    }

    render() {
        console.log("f"+this.props.allclaims.length);
        return this.props.currentUser ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

ResultsPage.propTypes = {
    claims: PropTypes.array.isRequired,
    communityClaims: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    policy: PropTypes.object,
    wallet: React.PropTypes.object,
    notifications: React.PropTypes.object,
    allclaims: React.PropTypes.object,
};

export default createContainer(() => {
    
    Meteor.subscribe('claims');
    Meteor.subscribe('policies');
    Meteor.subscribe('wallet');
    Meteor.subscribe('notifications');

    return {
        communityClaims: Claims.find({ owner: { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } }).fetch(),
        //claims: Claims.find({ sort: { createdAt: -1 } }).fetch(),
        claims: Claims.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        policy: Policies.findOne({ owner: Meteor.userId() }),
        wallet: Wallet.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        notifications: Notifications.find({user: Meteor.userId()}).fetch(),
        allclaims: Claims.find().fetch(),
    };
}, ResultsPage);