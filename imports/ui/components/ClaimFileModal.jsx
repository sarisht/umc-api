import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { CATEGORIES, hasInsufficientFunds } from "../../api/claims.js";
import { ClaimFiles } from "../../api/claimFiles";

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

        // Get category
        const category = ReactDOM.findDOMNode(this.refs.categoryInput).value;

        // Upload Document
        const myFile = $("#myFile")[0];
        if (myFile.files && myFile.files[0]) {
            // We upload only one file, in case multiple files were selected
            const upload = ClaimFiles.insert({
                file: myFile.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);

            upload.on('end', function (error, fileObj) {
                if (error) {
                    alert('Error during upload: ' + error);
                } else {
                    // Insert policy
                    Meteor.call('claims.insert', ask, title, description, category, fileObj._id);

                    // Close modal
                    $('#claimFileModal').modal('close');

                    // Reset input
                    ReactDOM.findDOMNode(this.refs.askInput).value = '';
                }
            });

            upload.start();
        }
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
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m7">
                                <input className={this.state.titleInvalid ? "invalid" : ""} ref="titleInput" id="titleInput" type="text"/>
                                <label htmlFor="titleInput">Title</label>
                            </div>
                            <div className="input-field col s12 m5">
                                <input className={this.state.askInvalid ? "invalid" : ""} ref="askInput" id="claimAsk" type="text"/>
                                <label htmlFor="claimAsk">Amount to be claimed (UMC)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m7">
                                <div className="file-field">
                                    <div className="btn">
                                        <span>File</span>
                                        <input type="file" id="myFile" required/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" placeholder="/path/to/documentation.pdf" type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m5">
                                <select className="browser-default right" defaultValue="Select Category" ref="categoryInput">
                                    <option disabled>Select Category</option>
                                    {CATEGORIES.map((category) =>{
                                        return <option key={category} value={category}>{category}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea ref="descriptionInput" id="descriptionInput" className="materialize-textarea"/>
                                <label htmlFor="descriptionInput">Description</label>
                            </div>
                            <div className="input-field col s12">
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