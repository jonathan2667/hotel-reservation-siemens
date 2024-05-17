import React, { useContext } from 'react';
import { HotelContext } from '../HotelContext';  // Assume this context manages bookings as well

function RoomDetails({ room, canBook }) {
    const { bookRoom } = useContext(HotelContext);

    const handleBooking = () => {
        if (canBook && room.isAvailable) {
            bookRoom(room.roomNumber);  // Implement this method in your context
            alert('Room booked successfully!');
        } else {
            alert('Room is not available.');
        }
    };

    return (
        <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h4>Room Number: {room.roomNumber}</h4>
            <p>Type: {roomType(room.type)}</p>
            <p>Price: ${room.price}</p>
            <button disabled={!room.isAvailable || !canBook} onClick={handleBooking}>
                {room.isAvailable ? 'Book Room' : 'Not Available'}
            </button>
        </div>
    );
}

function roomType(type) {
    const types = {
        1: 'Single Room',
        2: 'Double Room',
        3: 'Suite Room',
        4: 'Matrimonial Room'
    };
    return types[type] || 'Unknown Room Type';
}

export default RoomDetails;
