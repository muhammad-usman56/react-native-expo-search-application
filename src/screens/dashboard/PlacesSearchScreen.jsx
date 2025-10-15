import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MapView, OfflineIndicator, SearchBar } from '../../components';
import { withErrorBoundary } from '../../hocs';
import { loadSearchHistoryRequest } from '../../redux/actions/placesActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const PlacesSearchScreen = () => {
  const dispatch = useAppDispatch();
  const { selectedPlace } = useAppSelector(state => state.places);

  useEffect(() => {

    dispatch(loadSearchHistoryRequest());
  }, [dispatch]);

  const handlePlaceSelected = () => {
  
    console.log('Place selected');
  };

  return (
    <SafeAreaView style={styles.container}>
      <OfflineIndicator />
      
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore Places</Text>
          <SearchBar placeholder="Search for places..." onPlaceSelected={handlePlaceSelected} />
        </View>

        <View style={styles.mainContent}>
          {selectedPlace ? (
            <MapView place={selectedPlace} />
          ) : (
            <View style={styles.emptyMapContainer}>
              <Text style={styles.emptyMapIcon}>🗺️</Text>
              <Text style={styles.emptyMapTitle}>Search for a place</Text>
              <Text style={styles.emptyMapText}>
                Use the search bar above to find and explore places on the map
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withErrorBoundary(PlacesSearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  mainContent: {
    flex: 1,
  },
  emptyMapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#fafafa',
  },
  emptyMapIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyMapTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyMapText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

