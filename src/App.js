import React, { useState, useContext } from 'react';
import './App.css';
import { HotelContext } from './HotelContext';
import HotelList from './components/HotelList';
import Feedback from './components/Feedback';
import usePosition from './usePosition';
import { calculateDistance } from './utils/geoUtils';
import RoomDetails from './components/RoomDetails';

function App() {
  const { latitude, longitude, error } = usePosition();
  const { hotels, reservations, bookRoom } = useContext(HotelContext);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [radius, setRadius] = useState(''); // Start with an empty string for radius

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  // Filter hotels based on the radius, if radius is defined and hotels data is available
  const filteredHotels = radius && hotels ? hotels.filter(hotel => {
    const distance = calculateDistance(latitude, longitude, hotel?.latitude, hotel?.longitude);
    return distance / 1000 <= radius; // Convert distance from meters to kilometers
  }) : [];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hotel Reservation System</h1>
        {error && <p>{error}</p>}
      </header>
      <main>
        <div className="radius-input">
          <label htmlFor="radius">Search Radius (in kilometers):</label>
          <input
            type="number"
            id="radius"
            value={radius}
            onChange={e => setRadius(e.target.value)}
            placeholder="Enter radius"
            min="1"
          />
        </div>

        {radius && filteredHotels?.length > 0 ? (
          <>
            <p>Select a hotel from the list below to view details and book rooms:</p>
            <HotelList hotels={filteredHotels} onSelectHotel={handleSelectHotel} />
            {selectedHotel && (
              <div>
                <h2>{selectedHotel.name}</h2>
                {selectedHotel.rooms?.map(room => (
                  <RoomDetails 
                    key={room.roomNumber} 
                    room={room} 
                    canBook={filteredHotels.includes(selectedHotel)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <p>No hotels found within the specified radius or radius not set. Please adjust your search criteria.</p>
        )}

        <h3>Your Reservations:</h3>
        <ul>
          {reservations?.map((res, index) => (
            <li key={index}>{`Room Number ${res.roomNumber} in Hotel ID ${res.hotelId}`}</li>
          ))}
        </ul>
        <Feedback />
      </main>
    </div>
  );
}

export default App;