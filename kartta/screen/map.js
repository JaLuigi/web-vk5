import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map(props) {
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.04221,
  });

  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarker(coords);
  };

  return (
    <MapView
      style={styles.map}
      region={location}
      /* mapType='satellite' */
      onLongPress={showMarker}
    >
      {marker && (
        <Marker
          title="My Marker"
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
