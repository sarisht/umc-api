import React from 'react';

export default class ClaimEvidenceCard extends React.Component {
    render() {
        const src = "https://rac.com.au/-/media/images/rac-website/tile-images/images/car-motoring/insurance/car_crash_rs.jpg";

        return (
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <a href={src} target="_blank">
                        <img src={src} />
                    </a>
                </div>
                <div className="card-content">
                    <p>Passenger-side photo from the crash.</p>
                </div>
            </div>
        );
    }
}

ClaimEvidenceCard.propTypes = {
    claim: React.PropTypes.object.isRequired,
};