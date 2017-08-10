import React from 'react';

export default class ClaimDiscussionCard extends React.Component {
    renderPost() {
        return (
            <li className="collection-item avatar">
                <i className="material-icons circle">person</i>
                <span className="title">Gingerbread Man<span className="text-secondary right">2 days ago</span></span>
                <p className="text-secondary">
                    <span>0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826</span>

                </p>
                <p>In in culpa nulla elit esse. Ex cillum enim aliquip sit sit ullamco ex eiusmod fugiat. Cupidatat ad minim officia mollit laborum magna dolor tempor cupidatat mollit. Est velit sit ad aliqua ullamco laborum excepteur dolore proident incididunt in labore elit.</p>
            </li>
        );
    }

    renderForm() {
        return (
            <li className="discussion-form collection-item">
                <form>
                    <a href="#!" className="secondary-content"><i className="material-icons">send</i></a>
                    <textarea placeholder="Join the discussion" className="materialize-textarea"></textarea>
                </form>
            </li>
        );
    }

    render() {
        return (
            <div className="discussion-card card">
                <ul className="collection">
                    {this.renderForm()}
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