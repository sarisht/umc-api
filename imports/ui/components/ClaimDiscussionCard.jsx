import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { moment } from "meteor/momentjs:moment";

import { Posts } from "../../api/posts.js";

class ClaimDiscussionCard extends React.Component {
    handleSubmit(event) {
        event.preventDefault();

        // Get input
        const message = ReactDOM.findDOMNode(this.refs.messageInput).value.trim();

        // Insert post
        Meteor.call('posts.insert', this.props.claim._id, message);

        // Reset input
        ReactDOM.findDOMNode(this.refs.messageInput).value = '';
    }

    renderPost(post) {
        return (
            <li key={post._id} className="collection-item avatar">
                <i className="material-icons circle">person</i>
                <span className="title">
                    Gingerbread Man
                    <span className="text-secondary right">{moment(post.createdAt).format('MMM D')}</span>
                </span>
                <p className="text-secondary">{post.userWallet}</p>
                <p className="discussion-post-content">{post.message}</p>
            </li>
        );
    }

    renderEmptyPosts() {
        return (
            <li className="collection-item">
                <span className="text-secondary">No posts yet.</span>
            </li>
        );
    }

    renderPosts() {
        return (
            <ul className="collection">
                {this.props.posts.length === 0 ? this.renderEmptyPosts() : this.props.posts.map(this.renderPost)}
            </ul>
        );
    }

    renderForm() {
        const disabled = Meteor.userId() ? null : "disabled";
        const placeholder = disabled ? "Sign in to join the discussion" : "Join the discussion";

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" ref="messageInput" placeholder={placeholder} disabled={disabled} />
            </form>
        );
    }

    render() {
        return (
            <div className="discussion-card card">
                <div className="card-header">
                    {this.renderForm()}
                </div>
                {this.renderPosts()}
            </div>
        );
    }
}

ClaimDiscussionCard.propTypes = {
    claim: React.PropTypes.object.isRequired,
    posts: React.PropTypes.array,
};

export default createContainer((props) => {
    Meteor.subscribe('posts', props.claim._id);

    return {
        posts: Posts.find({ claimId: props.claim._id }, { sort: { createdAt: -1 } }).fetch(),
    };
}, ClaimDiscussionCard);