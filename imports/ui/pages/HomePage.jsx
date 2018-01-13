import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Claims } from '../../api/claims.js';
import { Policies } from '../../api/policies.js';

import ClaimCard from '../components/ClaimCard.jsx';
import ClaimListCard from '../components/ClaimListCard.jsx';
import PolicyCard from '../components/PolicyCard.jsx';
import StatCard from '../components/StatCard.jsx';

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
var contract_data = myContract.at(umc);
var pool = "0x875e5742c36413f04d66baa84a3209ad970f3c6f";

class HomePage extends Component {
    renderCommunityClaims(claims) {
        return claims.map((claim) => {
            return (
                <div key={claim._id} className="col s12 m6 l4">
                    <ClaimCard claim={claim} />
                </div>
            );
        });
    }

    renderLoggedIn() {
        var balance = parseInt(contract_data.balanceOf(pool));
        return (
            <div className="section">
                <div className="row">
                    <StatCard caption="Pool" metric={balance}/>
                    <h4 className="col s12">Manage Data</h4>
                    <div className="col s12 l8">
                        <PolicyCard policy={this.props.policy} />
                    </div>
                    <div className="col s12 l4">
                        <ClaimListCard claims={this.props.claims} policy={this.props.policy} isOwner={true}/>
                    </div>
                </div>
                <div className="row">
                    <h4 className="col s12">Vote on Claims</h4>
                    {this.renderCommunityClaims(this.props.communityClaims)}
                </div>
            </div>
        );
    }

    renderLoggedOut() {
        return (
            <div className="section">
                <div className="row">
                    <div className="col s12">
                        <h4>Welcome to the Next Generation of Insurance!</h4>
                        <p className="flow-text">We're a next-generation blockchain application for covering hidden costs of traditional insurance. As part of the UMC community, you are able to open policies and claims, as well as vote on claims by other members of our community. We're all here to help one another. Please create an account or log in to continue</p>
                    </div>
                </div>
                <div className="row">
                    <h4 className="col s12">Community Claims</h4>
                    {this.renderCommunityClaims(this.props.communityClaims)}
                </div>
            </div>
        );
    }

    render() {
        return this.props.currentUser ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

HomePage.propTypes = {
    claims: PropTypes.array.isRequired,
    communityClaims: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    policy: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('claims');
    Meteor.subscribe('policies');

    return {
        communityClaims: Claims.find({ owner: { $ne: Meteor.userId() } }, { sort: { createdAt: -1 } }).fetch(),
        claims: Claims.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        policy: Policies.findOne({ owner: Meteor.userId() }),
    };
}, HomePage);