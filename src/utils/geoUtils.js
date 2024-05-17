/**
 * Converts degrees to radians.
 */
const toRadians = (degree) => {
    return degree * Math.PI / 180;
  };
  
  /**
   * Calculates distance between two coordinates using the Haversine formula.
   */
  export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2-lat1);
    const Δλ = toRadians(lon2-lon1);
  
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    return R * c; // Distance in meters
  };
  