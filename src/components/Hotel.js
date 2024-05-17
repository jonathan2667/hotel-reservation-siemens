import React from 'react';

const Hotel = ({ hotel }) => {
    return (
        <div>
            <h3>{hotel.name}</h3>
            <p>Located at: {hotel.latitude}, {hotel.longitude}</p>
        </div>
    );
};

export default Hotel;
