import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Dimensions, BackHandler, Platform, Linking } from 'react-native';
import { Text } from '@/components/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TransparentHeader } from '@/components/native/TransparentHeader';
import { SalonDetails } from './types/SalonDetails';

// Try to load react-native-maps at runtime for mobile. Do not import statically
// so the web build / TS server won't fail if the native lib isn't installed.
let RNMaps: any = null;
try {
  RNMaps = require('react-native-maps');
} catch (e) {
  RNMaps = null;
}

// Try to load WebView at runtime for a mobile fallback (Leaflet in WebView)
let RNWebView: any = null;
try {
  RNWebView = require('react-native-webview');
} catch (e) {
  RNWebView = null;
}

interface SalonDetailsScreenProps {
  salonDetails: SalonDetails;
  onBack: () => void;
  onBookAppointment?: () => void;
}

type TabId = 'services' | 'therapists' | 'location' | 'ratings' | 'about';

// Map component for mobile (display-only with pin marker)
const MapView = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Mapbox access token
  const mapboxToken = 'pk.eyJ1IjoiYWppd25sIiwiYSI6ImNtMzhsaHFzNTB0dmsyaXE1enV5aXNrbjcifQ.MKG4wR3aMbdde0oisZLH7g';
  
  // Default coordinates fallback
  const DEFAULT_LAT = 10.643284;
  const DEFAULT_LNG = 124.477158;
  
  const validLat = isNaN(latitude) ? DEFAULT_LAT : latitude;
  const validLng = isNaN(longitude) ? DEFAULT_LNG : longitude;
  
  // Mobile map rendering: prefer native maps, fall back to WebView (Leaflet) or placeholder
  if (Platform.OS !== 'web' && (RNMaps || RNWebView)) {
    const MapViewComp = RNMaps && (RNMaps.default || RNMaps.MapView);
    const MarkerComp = RNMaps && (RNMaps.Marker || (RNMaps.default && RNMaps.default.Marker));
    const UrlTileComp = RNMaps && (RNMaps.UrlTile || (RNMaps.default && RNMaps.default.UrlTile));
    const WebViewComp = RNWebView && (RNWebView.default || RNWebView.WebView);
    
    // If react-native-maps is available, use native MapView with Mapbox tiles (display-only)
    if (MapViewComp) {
      const region = {
        latitude: validLat,
        longitude: validLng,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      };
      
      // Mapbox tile URL template
      const mapboxTileUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`;
      
      return (
        <View 
          className="w-full rounded-xl overflow-hidden"
          style={{ 
            height: 200, 
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <MapViewComp
            style={{ flex: 1 }}
            initialRegion={region}
            region={region}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
            showsUserLocation={false}
            showsMyLocationButton={false}
          >
            {/* Use custom Mapbox tiles if UrlTile is available, otherwise use default map provider */}
            {UrlTileComp && (
              <UrlTileComp
                urlTemplate={mapboxTileUrl}
                maximumZ={19}
                flipY={false}
              />
            )}
            {MarkerComp && (
              <MarkerComp
                coordinate={{ latitude: validLat, longitude: validLng }}
                draggable={false}
                pinColor={colors.primary}
              />
            )}
          </MapViewComp>
        </View>
      );
    }
    
    // If native maps not available but WebView is, render a Leaflet HTML inside WebView with Mapbox tiles (display-only)
    if (WebViewComp) {
      // Convert primary color to hex format for use in HTML/CSS
      const primaryColorHex = colors.primary || '#0d9488';
      
      const html = `<!doctype html>
<html>
<head>
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; }
    .leaflet-container { height: 100%; width: 100%; }
    .custom-marker {
      background-color: ${primaryColorHex};
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
    var mapboxToken = '${mapboxToken}';
    
    const map = L.map('map', { zoomControl: false, dragging: false, touchZoom: false, doubleClickZoom: false, scrollWheelZoom: false }).setView([${validLat}, ${validLng}], 14);
    
    // Use Mapbox tiles with custom styling
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=' + mapboxToken, {
      attribution: '© Mapbox © OpenStreetMap',
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);
    
    // Add marker with custom primary color icon
    var customIcon = L.divIcon({
      className: 'custom-marker-container',
      html: '<div class="custom-marker"></div>',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
    
    L.marker([${validLat}, ${validLng}], { icon: customIcon }).addTo(map);
  </script>
</body>
</html>`;
      
      return (
        <View 
          className="w-full rounded-xl overflow-hidden"
          style={{ 
            height: 200, 
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <WebViewComp
            originWhitelist={["*"]}
            source={{ html }}
            style={{ flex: 1 }}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }
  }
  
  // Fallback: placeholder if maps are not available
  return (
    <View 
      className="w-full rounded-xl overflow-hidden"
      style={{ 
        height: 200, 
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}
    >
      <View className="flex-1 items-center justify-center">
        <Ionicons name="map-outline" size={48} color={colors.icon} />
        <Text className="text-sm mt-2" style={{ color: colors.icon }}>
          Map View (Lat: {validLat.toFixed(4)}, Lng: {validLng.toFixed(4)})
        </Text>
      </View>
    </View>
  );
};

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View className="flex-row items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons key={`full-${i}`} name="star" size={16} color="#F59E0B" />
      ))}
      {hasHalfStar && (
        <Ionicons name="star-half" size={16} color="#F59E0B" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#F59E0B" />
      ))}
      <Text className="text-sm ml-2 font-semibold" style={{ color: '#F59E0B' }}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
};

export default function SalonDetailsScreen({ 
  salonDetails, 
  onBack,
  onBookAppointment,
}: SalonDetailsScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabId>('services');
  const [isFavorited, setIsFavorited] = useState(false);
  const tabScrollViewRef = useRef<ScrollView>(null);
  const contentScrollViewRef = useRef<ScrollView>(null);
  const tabLayouts = useRef<{ [key: string]: { x: number; width: number } }>({});
  const screenWidth = Dimensions.get('window').width;

  const tabs: { id: TabId; label: string }[] = [
    { id: 'services', label: 'Services' },
    { id: 'therapists', label: 'Therapists' },
    { id: 'location', label: 'Location' },
    { id: 'ratings', label: 'Ratings' },
    { id: 'about', label: 'About Us' },
  ];

  // Get tab index
  const getTabIndex = (tabId: TabId): number => {
    return tabs.findIndex(tab => tab.id === tabId);
  };

  // Handle tab change with auto-scroll
  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    const tabIndex = getTabIndex(tabId);
    
    // Scroll content to the selected tab
    if (contentScrollViewRef.current) {
      contentScrollViewRef.current.scrollTo({
        x: tabIndex * screenWidth,
        animated: true,
      });
    }

    // Auto-scroll tab bar to show active tab
    scrollTabToActive(tabId);
  };

  // Scroll tab bar to show active tab
  const scrollTabToActive = (tabId: TabId) => {
    const layout = tabLayouts.current[tabId];
    if (layout && tabScrollViewRef.current) {
      const tabIndex = getTabIndex(tabId);
      const tabWidth = layout.width;
      const tabX = layout.x;
      const scrollViewWidth = screenWidth;
      const scrollPosition = tabX - (scrollViewWidth / 2) + (tabWidth / 2);
      
      tabScrollViewRef.current.scrollTo({
        x: Math.max(0, scrollPosition),
        animated: true,
      });
    }
  };

  // Handle content scroll (swipe gesture)
  const handleContentScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const tabIndex = Math.round(offsetX / screenWidth);
    
    if (tabIndex >= 0 && tabIndex < tabs.length) {
      const newTab = tabs[tabIndex];
      if (newTab.id !== activeTab) {
        setActiveTab(newTab.id);
        scrollTabToActive(newTab.id);
      }
    }
  };

  // Handle Get Directions
  const handleGetDirections = async () => {
    const { latitude, longitude } = salonDetails;
    const validLat = isNaN(latitude) ? 10.643284 : latitude;
    const validLng = isNaN(longitude) ? 124.477158 : longitude;
    
    let url = '';
    if (Platform.OS === 'ios') {
      // Open Apple Maps
      url = `maps://maps.apple.com/?daddr=${validLat},${validLng}&directionsmode=driving`;
    } else if (Platform.OS === 'android') {
      // Open Google Maps
      url = `google.navigation:q=${validLat},${validLng}`;
      // Fallback to Google Maps web if app is not installed
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
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
        // Fallback to Google Maps web
        const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${validLat},${validLng}`;
        await Linking.openURL(fallbackUrl);
      }
    } catch (error) {
      console.error('Error opening maps:', error);
    }
  };

  // Handle Facebook
  const handleFacebook = () => {
    const facebookUrl = salonDetails.facebookUrl || `https://www.facebook.com/${salonDetails.name.replace(/\s+/g, '')}`;
    Linking.openURL(facebookUrl).catch(err => console.error('Error opening Facebook:', err));
  };

  // Handle Message
  const handleMessage = () => {
    const phoneNumber = salonDetails.phoneNumber || '';
    if (Platform.OS === 'ios') {
      Linking.openURL(`sms:${phoneNumber}`).catch(err => console.error('Error opening Messages:', err));
    } else {
      Linking.openURL(`sms:${phoneNumber}`).catch(err => console.error('Error opening Messages:', err));
    }
  };

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true; // Prevent default behavior (quitting the app)
    });

    return () => backHandler.remove();
  }, [onBack]);

  // Auto-scroll tab bar when activeTab changes (initial load and tab changes)
  useEffect(() => {
    // Small delay to ensure layouts are measured
    const timer = setTimeout(() => {
      scrollTabToActive(activeTab);
      // Also scroll content to active tab
      const tabIndex = getTabIndex(activeTab);
      if (contentScrollViewRef.current) {
        contentScrollViewRef.current.scrollTo({
          x: tabIndex * screenWidth,
          animated: false, // No animation on initial load
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Render tab content
  const renderTabContent = (tabId?: TabId) => {
    const currentTab = tabId || activeTab;
    switch (currentTab) {
      case 'services':
        return (
          <View className="px-5 py-4">
            <Text className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
              Services ({salonDetails.services.length})
            </Text>
            <View className="flex-row flex-wrap" style={{ gap: 8 }}>
              {salonDetails.services.map((service, index) => (
                <View
                  key={index}
                  className="px-3 py-2 rounded-lg"
                  style={{ 
                    backgroundColor: colors.primary + '20',
                  }}
                >
                  <Text 
                    className="text-sm font-medium" 
                    style={{ color: colors.primary }}
                  >
                    {service}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      
      case 'therapists':
        return (
          <View className="px-5 py-4">
            <Text className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
              Therapists ({salonDetails.therapists.length})
            </Text>
            <View className="flex-row flex-wrap" style={{ gap: 12 }}>
              {salonDetails.therapists.map((therapist) => (
                <View key={therapist.id} className="w-[48%]">
                  <View className="relative mb-2">
                    <Image
                      source={therapist.image}
                      className="w-full h-40 rounded-xl"
                      resizeMode="cover"
                    />
                    <View 
                      className="absolute bottom-2 right-2 flex-row items-center px-2 py-1 rounded-full"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                    >
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text className="text-white text-xs font-semibold ml-1">
                        {therapist.rating}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-base font-semibold mb-1" style={{ color: colors.text }}>
                    {therapist.name}
                  </Text>
                  <Text className="text-sm" style={{ color: colors.icon }}>
                    {therapist.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      
      case 'location':
        return (
          <View className="px-5 py-4">
            <Text className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
              Location
            </Text>
            <View className="mb-4">
              <View className="flex-row items-start mb-2">
                <Ionicons name="location-outline" size={20} color={colors.primary} style={{ marginTop: 2 }} />
                <Text className="text-base ml-2 flex-1" style={{ color: colors.text }}>
                  {salonDetails.address}
                </Text>
              </View>
              <View className="flex-row items-center mb-4">
                <Ionicons name="time-outline" size={18} color={colors.primary} />
                <Text className="text-sm ml-2" style={{ color: colors.icon }}>
                  {salonDetails.operatingHours}
                </Text>
              </View>
            </View>
            <MapView 
              latitude={salonDetails.latitude} 
              longitude={salonDetails.longitude} 
            />
          </View>
        );
      
      case 'ratings':
        return (
          <View className="px-5 py-4">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <View className="flex-row items-center mb-1">
                  <Text className="text-3xl font-bold mr-2" style={{ color: colors.text }}>
                    {salonDetails.rating}
                  </Text>
                  <StarRating rating={salonDetails.rating} />
                </View>
                <Text className="text-sm" style={{ color: colors.icon }}>
                  {salonDetails.reviewCount} reviews
                </Text>
              </View>
            </View>
            <View>
              {salonDetails.reviews.map((review, index) => (
                <View key={index} className="pb-4 mb-4 border-b" style={{ borderBottomColor: '#E5E7EB' }}>
                  <View className="flex-row items-center mb-2">
                    <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center mr-2">
                      <Text className="text-sm font-semibold" style={{ color: colors.text }}>
                        {review.userName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold" style={{ color: colors.text }}>
                        {review.userName}
                      </Text>
                      <StarRating rating={review.rating} />
                    </View>
                  </View>
                  <Text className="text-sm mt-2" style={{ color: colors.icon }}>
                    {review.comment}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      
      case 'about':
        return (
          <View className="px-5 py-4">
            <Text className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
              About Us
            </Text>
            <Text className="text-sm leading-6" style={{ color: colors.icon }}>
              {salonDetails.description}
            </Text>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Salon Image with Overlay Header */}
      <View className="w-full relative" style={{ height: 250 }}>
        <Image
          source={salonDetails.image}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Transparent Header Overlay */}
        <TransparentHeader onBack={onBack} />
        
        {/* Floating Heart Button */}
        <TouchableOpacity 
          className="absolute bottom-0 right-5 items-center justify-center rounded-full"
          style={{ 
            backgroundColor: 'white',
            width: 50,
            height: 50,
            marginBottom: -25, // Half overlaps into details section
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => {
            setIsFavorited(!isFavorited);
            // TODO: Implement add to favorites functionality
            console.log('Toggle favorite:', salonDetails.id, !isFavorited);
          }}
        >
          <Ionicons 
            name={isFavorited ? "heart" : "heart-outline"} 
            size={24} 
            color={primaryColor} 
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content Area */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4">
          {/* Salon Name */}
          <Text className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            {salonDetails.name}
          </Text>

          {/* Address */}
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={16} color={colors.icon} />
            <Text className="text-sm ml-1" style={{ color: colors.icon }}>
              {salonDetails.address}
            </Text>
          </View>

          {/* Operating Hours */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="time-outline" size={16} color={colors.icon} />
            <Text className="text-sm ml-1" style={{ color: colors.icon }}>
              {salonDetails.operatingHours}
            </Text>
          </View>

          {/* Salon Rating */}
          <View className="mb-4">
            <StarRating rating={salonDetails.rating} />
          </View>

          {/* Action Buttons: Facebook, Message, Directions */}
          <View className="flex-row justify-around mb-6" style={{ gap: 12 }}>
            <TouchableOpacity
              className="items-center"
              onPress={handleFacebook}
            >
              <View 
                className="w-14 h-14 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Ionicons name="logo-facebook" size={24} color={primaryColor} />
              </View>
              <Text className="text-xs" style={{ color: colors.icon }}>
                Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center"
              onPress={handleMessage}
            >
              <View 
                className="w-14 h-14 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Ionicons name="chatbubble-outline" size={24} color={primaryColor} />
              </View>
              <Text className="text-xs" style={{ color: colors.icon }}>
                Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center"
              onPress={handleGetDirections}
            >
              <View 
                className="w-14 h-14 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Ionicons name="navigate-outline" size={24} color={primaryColor} />
              </View>
              <Text className="text-xs" style={{ color: colors.icon }}>
                Directions
              </Text>
            </TouchableOpacity>
          </View>

          {/* Navigation Tabs */}
          <ScrollView 
            ref={tabScrollViewRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            contentContainerStyle={{ paddingRight: 0 }}
          >
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => handleTabChange(tab.id)}
                className={index < tabs.length - 1 ? "mr-4" : ""}
                onLayout={(event) => {
                  const { x, width } = event.nativeEvent.layout;
                  tabLayouts.current[tab.id] = { x, width };
                }}
              >
                <View className="pb-2 items-center">
                  <Text
                    className="text-base font-medium text-center"
                    style={{
                      color: activeTab === tab.id ? primaryColor : colors.icon,
                    }}
                  >
                    {tab.label}
                  </Text>
                  {activeTab === tab.id && (
                    <View 
                      className="absolute bottom-0 left-0 right-0"
                      style={{ 
                        height: 2, 
                        backgroundColor: primaryColor,
                      }} 
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content with Swipe Gesture */}
        <View>
          <ScrollView
            ref={contentScrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleContentScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={screenWidth}
            snapToAlignment="start"
            nestedScrollEnabled={true}
            scrollEnabled={true}
            style={{ flexGrow: 0 }}
          >
            {tabs.map((tab) => (
              <View key={tab.id} style={{ width: screenWidth }}>
                {renderTabContent(tab.id)}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Book Appointment Button */}
      <View 
        className="px-5 py-4 border-t"
        style={{ 
          borderTopColor: '#E5E7EB',
          paddingBottom: insets.bottom || 16,
        }}
      >
        <TouchableOpacity
          className="w-full flex-row items-center justify-center px-4 py-4 rounded-xl"
          style={{ backgroundColor: primaryColor }}
          onPress={onBookAppointment}
        >
          <Text className="text-base text-white font-semibold">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
