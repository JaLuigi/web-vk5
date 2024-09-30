import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleLongPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarkers((currentMarkers) => [...currentMarkers, coords]);
  };

  if (!location) {
    return null;
  }

  return (
    <MapView
      style={styles.map}
      region={location}
      onLongPress={handleLongPress}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
