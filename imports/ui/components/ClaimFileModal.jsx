import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { hasInsufficientFunds } from "../../api/claims.js";

export default class ClaimFileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { askInvalid: false, titleInvalid: false, descriptionInvalid: false};
    }

    handleSubmit(event) {
        event.preventDefault();

        // Reset form
        this.setState({askInvalid: false, titleInvalid: false, descriptionInvalid: false});

        // Get title
        const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
        if (title.length === 0) {
            this.setState({titleInvalid: true});
            return;
        }

        // Get description
        const description = ReactDOM.findDOMNode(this.refs.descriptionInput).value.trim();
        if (description.length === 0) {
            this.setState({descriptionInvalid: true});
            return;
        }

        // Get ask
        const ask = parseInt(ReactDOM.findDOMNode(this.refs.askInput).value);
        if (isNaN(ask) || ask <= 0) {
            this.setState({askInvalid: true});
            return;
        }

        // Check for insufficient funds
        if (hasInsufficientFunds(ask, this.props.claims, this.props.policy)) {
            this.setState({askInvalid: true});
            return;
        }

        // Insert policy
        Meteor.call('claims.insert', ask, title, description);

        // Close modal
        $('#claimFileModal').modal('close');

        // Reset input
        ReactDOM.findDOMNode(this.refs.askInput).value = '';
    }

    render() {
        return (
            <div id="claimFileModal" className="modal">
                <div className="modal-content">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <div className="col s12">
                                <h4>File Claim<i className="modal-close material-icons right">close</i></h4>
                            </div>
                            <div className="input-field col s12 m6">
                                <input className={this.state.titleInvalid ? "invalid" : ""} ref="titleInput" id="titleInput" type="text"/>
                                <label htmlFor="titleInput">Title</label>
                            </div>
                            <div className="input-field col s12 m6">
                                <input className={this.state.askInvalid ? "invalid" : ""} ref="askInput" id="claimAsk" type="text"/>
                                <label htmlFor="claimAsk">Ask</label>
                            </div>
                            <div className="input-field col s12">
                                <textarea ref="descriptionInput" id="descriptionInput" className="materialize-textarea"/>
                                <label htmlFor="descriptionInput">Description</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className="btn-large waves-effect waves-light" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

ClaimFileModal.propTypes = {
    claims: React.PropTypes.array.isRequired,
    policy: React.PropTypes.object.isRequired,
};