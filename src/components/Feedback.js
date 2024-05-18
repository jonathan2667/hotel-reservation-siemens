import React, { useState, useContext } from 'react';
import { HotelContext } from '../HotelContext';

const Feedback = () => {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [userFeedback, setUserFeedback] = useState('');
    const { hotels, addFeedback } = useContext(HotelContext);

    const handleSubmit = () => {
        if (selectedRoom && userFeedback) {
            addFeedback(selectedRoom, userFeedback);
            setUserFeedback('');  
        } else {
            alert("Please select a room and write feedback.");
        }
    };

    return (
        <div className="feedback-form"> {/* Use feedback-form class here */}
            <h3>Leave Your Feedback:</h3>
            <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
                <option value="">Select a room</option>
                {hotels.map((hotel) =>
                    hotel.rooms.map((room) => (
                        <option key={room.roomNumber} value={room.roomNumber}>
                            {`Room ${room.roomNumber} - ${hotel.name}`}
                        </option>
                    ))
                )}
            </select>
            <textarea
                value={userFeedback}
                onChange={(e) => setUserFeedback(e.target.value)}
                placeholder="Leave your feedback here..."
            />
            <button onClick={handleSubmit}>Submit Feedback</button>
        </div>
    );
};

export default Feedback;
