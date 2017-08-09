import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class ClaimFileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { invalid: false };
    }

    handleSubmit(event) {
        event.preventDefault();

        // Reset form
        this.setState({ invalid: false })

        // Get input
        const ask = parseInt(ReactDOM.findDOMNode(this.refs.askInput).value);
        if (isNaN(ask) || ask <= 0) {
            this.setState({ invalid: true })
            return;
        }

        // Insert policy
        Meteor.call('claims.insert', ask);

        // Close modal
        $('#claimFileModal').modal('close');

        // Reset input
        ReactDOM.findDOMNode(this.refs.askInput).value = '';
    }

    initModal() {
        $(document).ready(function() {
            $('.modal').modal();
        });
    }

    render() {
        this.initModal();

        return (
            <div id="claimFileModal" className="modal">
                <div className="modal-content">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <div className="col s12">
                                <h4>File Claim<i className="modal-close material-icons right">close</i></h4>
                            </div>
                            <div className="input-field col s12 m6">
                                <input className={this.state.invalid ? "invalid" : ""} ref="askInput" id="claimAsk" type="text"/>
                                <label htmlFor="claimAsk">Ask</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className="btn waves-effect waves-light" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}