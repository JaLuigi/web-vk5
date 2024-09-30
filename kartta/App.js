import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import Map from './screen/map';
import { useState } from 'react';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const settings = {
  backgroundColor: '#00a484'
};

const icons = {
  location_not_know: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
};

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_know);
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.04221
  });

  const getUsersPosition = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync()

    try {
      if (status !== 'granted') {
        console.log('Geolocation failed')
        return
      }
      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({...location,"latitude": position.coords.latitude, "longitude": position.coords.longitude})
    } catch (error) {
        console.log(error)
    }  
  }

  return (
    <PaperProvider>
      <Appbar
        title="Map"
        backgroundColor={settings.backgroundColor}
        icon={icon}
        getUsersPosition={getUsersPosition}
      />
      <SafeAreaView style={styles.container}>
        <Map location={location}/>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    /*marginTop: Platform.OS === 'android' ? 25 : 0*/
  }
});
