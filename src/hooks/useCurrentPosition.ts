import {useEffect, useState} from 'react';
import {handleRequestPermissionLocation} from '../utils/requestPermissions';
import Geolocation from 'react-native-geolocation-service';

export const useCurrentPosition = () => {
  const [currentPosition, setCurrentPosition] =
    useState<Record<'lat' | 'lng', null | number>>();

  useEffect(() => {
    handleRequestPermissionLocation()
      .then(isGranted => {
        if (isGranted) {
          Geolocation.getCurrentPosition(
            position => {
              setCurrentPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      })
      .catch(error => console.log(error));
  }, []);

  return currentPosition;
};
