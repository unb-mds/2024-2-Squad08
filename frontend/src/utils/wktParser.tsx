
interface Coordinates {
    lat: number;
    lng: number;
  }
  
  export function parseWKT(wkt: string | null): Coordinates | null {
    if (!wkt) return null;
  
    try {
      // WKT format example: "POINT(longitude latitude)"
      // Remove the "POINT" text and parentheses, then split the coordinates
      const coordsStr = wkt.replace('POINT(', '').replace(')', '');
      const [longitude, latitude] = coordsStr.split(' ').map(Number);
  
      if (isNaN(latitude) || isNaN(longitude)) {
        console.error('Invalid coordinates in WKT:', wkt);
        return null;
      }
  
      return {
        lat: latitude,
        lng: longitude
      };
    } catch (error) {
      console.error('Error parsing WKT:', error);
      return null;
    }
  }