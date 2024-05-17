import React, { useContext } from 'react';
import { HotelContext } from './HotelContext';

const Room = ({ room }) => {
    const { addReservation } = useContext(HotelContext);
    const roomTypes = {
        1: "Single Room",
        2: "Double Room",
        3: "Suite Room",
        4: "Matrimonial Room"
    };

    const handleReservation = () => {
        addReservation({
            roomNumber: room.roomNumber,
            type: room.type,
            price: room.price
        });
    };

    return (
        <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h4>{roomTypes[room.type] || "Unknown Room Type"}</h4>
            <p>Room Number: {room.roomNumber}</p>
            <p>Price: ${room.price}</p>
            <p>Status: {room.isAvailable ? "Available" : "Not Available"}</p>
            {room.isAvailable && <button onClick={handleReservation}>Book This Room</button>}
        </div>
    );
};

export default Room;
