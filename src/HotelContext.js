import React, { createContext, useState } from 'react';
import hotelData from './data/hotels.json';

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
    const [hotels, setHotels] = useState(hotelData || []); 
    const [bookings, setBookings] = useState([]);
    const [feedback, setFeedback] = useState([]);

    const addFeedback = (roomNumber, userFeedback) => {
        const newFeedback = {
            roomNumber,
            text: userFeedback
        };
        setFeedback(prevFeedback => [...prevFeedback, newFeedback]);
    };

    const bookRoom = (roomNumber, startDate, endDate) => {
        let isAvailable = !bookings.some(booking =>
            booking.roomNumber === roomNumber &&
            ((startDate >= booking.startDate && startDate <= booking.endDate) ||
             (endDate >= booking.startDate && endDate <= booking.endDate) ||
             (startDate <= booking.startDate && endDate >= booking.endDate))
        );

        if (isAvailable) {
            const updatedHotels = hotels.map(hotel => ({
                ...hotel,
                rooms: hotel.rooms.map(room => {
                    if (room.roomNumber === roomNumber) {
                        return { ...room, isAvailable: false };
                    }
                    return room;
                })
            }));
            
            const newBooking = {
                roomNumber,
                startDate,
                endDate
            };
            
            setHotels(updatedHotels);
            setBookings(prevBookings => [...prevBookings, newBooking]);
        } else {
            alert("Room is not available for the selected dates.");
        }
    };

    return (
        <HotelContext.Provider value={{
            hotels,
            bookings,
            feedback,
            addFeedback,
            bookRoom
        }}>
            {children}
        </HotelContext.Provider>
    );
};
