import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Linking, Platform } from 'react-native';
import { Text } from '@/components/Text';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { MAPBOX_TOKEN } from '../../../env';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Destination {
  latitude: number;
  longitude: number;
}

interface Props {
  destination: Destination;
  destinationName?: string;
  onBack?: () => void;
}

const GetDirectionsScreen: React.FC<Props> = ({ destination, destinationName, onBack }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: number;
    destinationName?: string;
  } | null>(null);

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

      // Fetch directions
      await fetchDirections(location.coords, destination);
      setLoading(false);
    })();
  }, [destination]);

  const fetchDirections = async (origin: Location.LocationObjectCoords, dest: Destination) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        setRouteInfo({
          distance: route.distance,
          duration: route.duration,
          destinationName: destinationName || 'Destination',
        });
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
      Alert.alert('Error', 'Failed to fetch directions.');
    }
  };

  const handleStartNavigation = async () => {
    if (!currentLocation) return;

    const { latitude, longitude } = destination;
    const validLat = latitude;
    const validLng = longitude;

    let url = '';
    if (Platform.OS === 'ios') {
      // Open Apple Maps
      url = `maps://maps.apple.com/?daddr=${validLat},${validLng}&directionsmode=driving`;
    } else if (Platform.OS === 'android') {
      // Try Google Maps first
      url = `google.navigation:q=${validLat},${validLng}`;
      const canOpenGoogle = await Linking.canOpenURL(url);
      if (!canOpenGoogle) {
        // Fallback to Google Maps web
        url = `https://www.google.com/maps/dir/?api=1&destination=${validLat},${validLng}`;
      }
    } else {
      // Web fallback
      url = `https://www.google.com/maps/dir/?api=1&destination=${validLat},${validLng}`;
    }

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open navigation app');
      }
    } catch (error) {
      console.error('Error opening navigation:', error);
      Alert.alert('Error', 'Unable to start navigation');
    }
  };

  if (loading || !currentLocation) {
    return (
      <View style={styles.container}>
        <View style={styles.loading} />
      </View>
    );
  }

  const htmlContent = `<!doctype html>
<html>
<head>
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; }
    .leaflet-container { height: 100%; width: 100%; }
    .custom-marker {
      background-color: ${colors.primary || '#0d9488'};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      position: relative;
    }
    .custom-marker::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background-color: white;
      border-radius: 50%;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    // Mapbox access token
    var mapboxToken = '${MAPBOX_TOKEN}';
    
    const map = L.map('map', { zoomControl: false }).setView([${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}], 13);
    
    // Use Mapbox tiles
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxToken, {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    // Custom icon for markers
    var customIcon = L.divIcon({
      className: 'custom-marker-container',
      html: '<div class="custom-marker"></div>',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    var origin = L.marker([${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}], { icon: customIcon }).addTo(map)
      .bindPopup('Your Location');

    var destination = L.marker([${destination.latitude}, ${destination.longitude}], { icon: customIcon }).addTo(map)
      .bindPopup('Destination');

    // Fetch directions
    fetch('https://api.mapbox.com/directions/v5/mapbox/driving/${currentLocation.coords.longitude},${currentLocation.coords.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&steps=true&access_token=' + mapboxToken)
      .then(response => response.json())
      .then(data => {
        if (data.routes && data.routes.length > 0) {
          var route = data.routes[0];
          var coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
          L.polyline(coordinates, {color: '${colors.primary || '#0d9488'}', weight: 4}).addTo(map);
          map.fitBounds(coordinates);
        }
      })
      .catch(error => {
        console.error('Error fetching directions:', error);
      });
  </script>
</body>
</html>`;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: colors.background }]}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={[styles.headerContent, { backgroundColor: colors.background }]}>
          <Text style={[styles.headerText, { color: colors.text }]}>
            Your Location → {routeInfo?.destinationName || 'Destination'}
          </Text>
          {routeInfo && (
            <Text style={[styles.headerSubtext, { color: colors.icon }]}>
              {Math.round(routeInfo.distance / 1000)} km • {Math.round(routeInfo.duration / 60)} min
            </Text>
          )}
        </View>
      </View>

      {/* Map */}
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={styles.webview}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Drawer */}
      {routeInfo && (
        <View style={[styles.bottomDrawer, { backgroundColor: colors.background }]}>
          <View style={styles.drawerContent}>
            <View style={styles.etaContainer}>
              <Text style={[styles.etaLabel, { color: colors.icon }]}>Estimated arrival</Text>
              <Text style={[styles.etaTime, { color: colors.text }]}>
                {new Date(Date.now() + routeInfo.duration * 1000).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
              <Text style={[styles.etaDistance, { color: colors.icon }]}>
                {Math.round(routeInfo.distance / 1000)} km • {Math.round(routeInfo.duration / 60)} min
              </Text>
            </View>
            <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.primary }]} onPress={handleStartNavigation}>
              <Text style={[styles.startButtonText, { color: colors.background }]}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerSubtext: {
    fontSize: 14,
  },
  webview: {
    flex: 1,
  },
  bottomDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  drawerContent: {
    padding: 20,
  },
  etaContainer: {
    marginBottom: 20,
  },
  etaLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  etaTime: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  etaDistance: {
    fontSize: 16,
  },
  startButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  loading: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default GetDirectionsScreen;
