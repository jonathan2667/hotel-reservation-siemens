import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { HotelContext } from './HotelContext';
import HotelList from './components/HotelList';
import Feedback from './components/Feedback';
import usePosition from './usePosition';
import { calculateDistance } from './utils/geoUtils';
import RoomDetails from './components/RoomDetails';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const {
    error,
    feedback,
    hotels,
    reservations,
    bookRoom
  } = useContext(HotelContext);
  const { latitude, longitude } = usePosition(); // Fetch position
  const { bookings } = useContext(HotelContext);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [radius, setRadius] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      console.log("Position ready: ", latitude, longitude);
      setReady(true);
    }
  }, [latitude, longitude]);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    console.log("Selected Hotel: ", hotel);
  };

  const filteredHotels = ready && radius && hotels.length > 0 ? hotels.filter(hotel => {
    const distance = calculateDistance(latitude, longitude, hotel.latitude, hotel.longitude);
    console.log("Hotel: ", hotel.name, " Distance: ", distance / 1000, "km");
    return distance / 1000 <= radius; 
  }) : [];

  if (!ready) {
    return <div>Loading your location...</div>; 
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hotel Reservation System</h1>
        {error && <p>{error}</p>}
      </header>
      <main>
        <div className="radius-input-section">
          <label htmlFor="radius">Search Radius (in kilometers):</label>
          <input
            type="number"
            id="radius"
            value={radius}
            onChange={e => {
              console.log("Radius input changed: ", e.target.value);
              setRadius(e.target.value);
            }}
            placeholder="Enter radius"
            min="1"
          />
        </div>

        {radius && filteredHotels.length > 0 ? (
          <>
            <p className="hotel-selection-prompt">Select a hotel from the list below to view details and book rooms:</p>
            <HotelList hotels={filteredHotels} onSelectHotel={handleSelectHotel} />
            {selectedHotel && selectedHotel.rooms.map(room => (
              <RoomDetails 
                key={room.roomNumber} 
                room={room} 
                canBook={filteredHotels.includes(selectedHotel)}
              />
            ))}
          </>
        ) : (
          <p>No hotels found within the specified radius or radius not set. Please adjust your search criteria.</p>
        )}

        <div className="reservations-section">
            <h3>Your Reservations:</h3>
            <ul>
                {bookings && bookings.length > 0 && bookings.map((res, index) => {
                    console.log("Reservation: ", res);
                    return (
                        <li key={index}>{`Room Number ${res.roomNumber} in Hotel ID from ${res.startDate.toDateString()} to ${res.endDate.toDateString()}`}</li>
                    );
                })}
            </ul>
        </div>


        <Feedback />

        <div className="feedback-display-section">
          <h3>Customer Feedback:</h3>
          <ul>
            {feedback && feedback.length > 0 && feedback.map((fb, index) => {
              console.log("Feedback: ", fb);
              return (
                <li key={index}>{`Room Number ${fb.roomNumber}: ${fb.text}`}</li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
