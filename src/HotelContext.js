import React, { createContext, useState, useEffect } from 'react';
import hotelData from './data/hotels.json';

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
    const [hotels, setHotels] = useState(hotelData);
    const [bookings, setBookings] = useState([]);

    const bookRoom = (roomNumber) => {
        const newHotels = hotels.map(hotel => {
            hotel.rooms = hotel.rooms.map(room => {
                if (room.roomNumber === roomNumber) {
                    if (room.isAvailable) {
                        room.isAvailable = false;  // Update availability
                        setBookings([...bookings, room]);  // Add to bookings
                    }
                }
                return room;
            });
            return hotel;
        });
        setHotels(newHotels);
    };

    return (
        <HotelContext.Provider value={{ hotels, bookRoom, bookings }}>
            {children}
        </HotelContext.Provider>
    );
};
