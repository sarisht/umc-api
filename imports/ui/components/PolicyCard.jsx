import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { moment } from "meteor/momentjs:moment";
import {Wallet} from "../../api/wallet";
import { createContainer } from 'meteor/react-meteor-data';

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
var umc = "0xd61d073a57a09c694dad55ab3fb88af5f9342c06";


class PolicyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inEdit: false };
    }

    handleEdit() {
        this.setState({ inEdit: !this.state.inEdit });
    }

    handleDelete() {
        if (confirm("Deleting your policy will also delete any outstanding claims. Are you sure?"))
            Meteor.call('policies.deactivate', this.props.policy._id, false);
    }

    handleSubmit(event) {
        event.preventDefault();

        // Get input
        const amount= parseInt(ReactDOM.findDOMNode(this.refs.amountInput).value);

        if (isNaN(amount) || amount <= 0)
            return;


        //Interface to transfer from user's wallet to shared pool's wallet//
        //try{
            let res = this.props.wallet;
            sender = res[0].wallet;
            console.log(web3.personal.unlockAccount(sender,'!@superpassword',5));
            console.log(sender);
            var contract_data = myContract.at(umc);
            web3.eth.defaultAccount = sender;
            contract_data.transfer(umc,amount);

        // Insert policy
        if (!this.props.policy)
            Meteor.call('policies.insert', amount);
        else
            Meteor.call('policies.addFunds', this.props.policy._id, amount);
        //}
        //catch(e){
            
        //}
        //end//
        
        // Reset state
        this.setState({ inEdit: false });

        // Reset input
        ReactDOM.findDOMNode(this.refs.amountInput).value = '';
    }

    static renderMetric(metric, label) {
        return (
            <div className="col s6">
                <h1>{metric}</h1>
                <p className="text-secondary">{label}</p>
            </div>
        );
    }

    renderStats() {
        return (
            <div className="policy-card-stats card-content">
                <div className="row">
                    {PolicyCard.renderMetric(this.props.policy.amount, 'UMC Put In')}
                    {PolicyCard.renderMetric(this.props.policy.payoutMax, 'UMC Max Payout')}
                    {PolicyCard.renderMetric(this.props.policy.payoutRemaining, 'UMC Payout Remaining')}
                    {PolicyCard.renderMetric(120000, 'UMC Float')}
                </div>
            </div>
        );
    }
    
    renderEditPolicyForm() {
        return (
            <div className="edit-policy card-content">
                <div className="card-title">
                    <i onClick={this.handleEdit.bind(this)} className="material-icons right">close</i>
                </div>
                <h3>Add funds or delete your policy for a fee.</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="input-field col s8">
                            <input ref="amountInput" placeholder="Enter Additional Funds (USD)" type="text" />
                            
                        </div>
                        
                            
                       
                        <div className="input-field col s12">
                            <button type="submit" className="btn-large waves-effect waves-light">Add Coverage</button>&nbsp;
                            <button onClick={this.handleDelete.bind(this)} className="btn-flat btn-large">Delete Policy</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    renderNoPolicyForm() {
        return (
            <div className="no-policy card-content">
                <h1>Add funds to get coverage.</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input ref="amountInput" placeholder="Enter Funds (UMC)" type="text" />
                        </div>
                        <div className="input-field col s12 m6">
                            <button className="btn waves-effect waves-light btn-large" type="submit">Get Covered</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    renderContent() {
        if (!this.props.policy)
            return this.renderNoPolicyForm();
        if (this.state.inEdit)
            return this.renderEditPolicyForm();
        return this.renderStats();
    }

    renderHeader() {
        if (!this.props.policy || this.state.inEdit)
            return null;

        return (
            <div className="card-header">
                <div className="card-title">
                    My Policy
                    <i onClick={this.handleEdit.bind(this)} className="material-icons right">mode_edit</i>
                </div>
                <p className="text-secondary">Created {moment(this.props.policy.createdAt).format('MMMM D, YYYY')}</p>
            </div>
        );
    }

    render() {
        return (
            <div className="policy-card card medium">
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        );
    }
}

PolicyCard.propTypes = {
    policy: React.PropTypes.object,
    wallet: React.PropTypes.array,
};

export default createContainer(() => {
    Meteor.subscribe('wallet');

    return {
        wallet: Wallet.find({owner: Meteor.userId()}, {sort: {createdAt: -1}}).fetch(),
    };
}, PolicyCard);