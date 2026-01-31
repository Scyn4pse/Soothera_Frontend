import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { MAPBOX_TOKEN } from '../../../env';

interface Destination {
  latitude: number;
  longitude: number;
}

interface Props {
  destination: Destination;
}

const GetDirectionsScreen: React.FC<Props> = ({ destination }) => {
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to show directions from your current location.');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      setLoading(false);
    })();
  }, []);

  if (loading || !currentLocation) {
    return (
      <View style={styles.container}>
        <View style={styles.loading} />
      </View>
    );
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Directions</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; height: 100vh; }
        #map { height: 100%; width: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}', {
          maxZoom: 18,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
        }).addTo(map);

        var origin = L.marker([${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}]).addTo(map)
          .bindPopup('Your Location');

        var destination = L.marker([${destination.latitude}, ${destination.longitude}]).addTo(map)
          .bindPopup('Destination');

        // Fetch directions
        fetch('https://api.mapbox.com/directions/v5/mapbox/driving/${currentLocation.coords.longitude},${currentLocation.coords.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&steps=true&access_token=${MAPBOX_TOKEN}')
          .then(response => response.json())
          .then(data => {
            if (data.routes && data.routes.length > 0) {
              var route = data.routes[0];
              var coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
              L.polyline(coordinates, {color: 'blue', weight: 4}).addTo(map);
              map.fitBounds(coordinates);
            }
          });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  webview: {
    flex: 1,
  },
});

export default GetDirectionsScreen;
