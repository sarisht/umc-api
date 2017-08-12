import React from 'react';

export default class StatCard extends React.Component {
    render() {
        return (
            <div className="stat-card card">
                <div className="card-header valign-wrapper">
                    <div className="stat-content">
                        <h1>
                            {this.props.metric ? this.props.metric : <i className="material-icons">{this.props.icon}</i> }
                        </h1>
                        <span className="text-secondary">{this.props.caption}</span>
                    </div>
                </div>
            </div>
        );
    }
}

StatCard.propTypes = {
    caption: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    metric: React.PropTypes.number,
};