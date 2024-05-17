import React, { useState, useContext } from 'react';
import { HotelContext } from '../HotelContext';

const Feedback = () => {
    const [userFeedback, setUserFeedback] = useState('');
    const { addFeedback } = useContext(HotelContext);

    const handleSubmit = () => {
        addFeedback(userFeedback);
        setUserFeedback('');  // Clear feedback input after submission
    };

    return (
        <div>
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
