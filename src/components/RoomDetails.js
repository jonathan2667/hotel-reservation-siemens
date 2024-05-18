import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HotelContext } from '../HotelContext';

function RoomDetails({ room, canBook }) {
    const { bookRoom } = useContext(HotelContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    const handleBooking = () => {
        if (canBook && room.isAvailable && startDate < endDate) {
            bookRoom(room.roomNumber, startDate, endDate);
            alert('Room booked successfully!');
        } else {
            alert('Room is not available or dates are invalid.');
        }
    };

    return (
        <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h4>Room Number: {room.roomNumber}</h4>
            <p>Type: {roomType(room.type)}</p>
            <p>Price: ${room.price}</p>
            {room.isAvailable && canBook && (
                <>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                    <button onClick={handleBooking}>Book Room</button>
                </>
            )}
            {!room.isAvailable && <p>Not Available</p>}
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
