import React from 'react';

export default class HowItWorksPage extends React.Component {
    render() {
        return (
            <div className="section">
                <h4>How It Works</h4>
                <div className="row">
                    <div className="col s12">
                        <div className="video-container">
                            <iframe width="853" height="480" src="//www.youtube.com/embed/5AsfZ7ovbsM?rel=0" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}