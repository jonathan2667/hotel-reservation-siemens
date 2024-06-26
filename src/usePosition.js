import { useState, useEffect } from 'react';

const usePosition = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return {...position, error};
};

export default usePosition;
