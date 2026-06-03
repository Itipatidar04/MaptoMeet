//Geolocation logic or service from where we'll get our current location coordinates

//Define return type
export interface CurrentLocation {
  latitude: number;
  longitude: number;
}

//function declaration
export async function getCurrentLocation(): Promise<CurrentLocation> {
  //navigatior.geolocation works with callbacks
  // we want to use async/await, thus we wrap it inside promise
  return new Promise((resolve, reject) => {
    // Ask browser for current location
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },

      // Error callback
      (error) => {
        reject(error);
      },
      //this enables extra features of high accuracy, age etc.
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
}
