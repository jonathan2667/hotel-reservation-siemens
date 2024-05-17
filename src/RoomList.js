import React from 'react';
import Room from './Room';

const RoomList = ({ rooms }) => {
  return (
    <div>
      <h3>Available Rooms:</h3>
      {rooms.map(room => <Room key={room.roomNumber} room={room} />)}
    </div>
  );
};

export default RoomList;
