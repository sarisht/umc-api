import React from 'react';

export default class ClaimDiscussionCard extends React.Component {
    renderPost() {
        return (
            <li className="collection-item avatar">
                <i className="material-icons circle">person</i>
                <span className="title">Gingerbread Man<span className="text-secondary right">Aug 20</span></span>
                <p className="text-secondary">cd2a3d9f938e13cd947ec05abc7fe734df8dd826</p>
                <p className="discussion-post-content">In in culpa nulla elit esse. Ex cillum enim aliquip sit sit ullamco ex eiusmod fugiat. Cupidatat ad minim officia mollit laborum magna dolor tempor cupidatat mollit. Est velit sit ad aliqua ullamco laborum excepteur dolore proident incididunt in labore elit.</p>
            </li>
        );
    }

    renderForm() {
        return (
            <form>
                <textarea placeholder="Join the discussion" className="materialize-textarea" />
            </form>
        );
    }

    render() {
        return (
            <div className="discussion-card card">
                <div className="card-header">
                    {this.renderForm()}
                </div>
                <ul className="collection">
                    {this.renderPost()}
                    {this.renderPost()}
                    {this.renderPost()}
                </ul>
            </div>
        );
    }
}

ClaimDiscussionCard.propTypes = {
    claim: React.PropTypes.object.isRequired,
};