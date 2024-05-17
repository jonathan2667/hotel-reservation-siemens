import React from 'react';
import Hotel from './Hotel';

const HotelList = ({ hotels, onSelectHotel }) => {
    return (
      <div>
        {hotels.map(hotel => (
          <button key={hotel.id} onClick={() => onSelectHotel(hotel)} style={{ width: '100%', padding: '10px', margin: '5px 0' }}>
            <Hotel hotel={hotel} />
          </button>
        ))}
      </div>
    );
};

export default HotelList;
