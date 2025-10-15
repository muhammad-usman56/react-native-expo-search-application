import React, { useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchHistory } from '../../components';
import { withErrorBoundary } from '../../hocs';
import { clearSearchHistory, loadSearchHistoryRequest } from '../../redux/actions/placesActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const SearchHistoryScreen = () => {
  const dispatch = useAppDispatch();
  const { searchHistory } = useAppSelector(state => state.places);

  useEffect(() => {
    dispatch(loadSearchHistoryRequest());
  }, [dispatch]);

  const handleClearAll = () => {
    Alert.alert(
      'Clear All History',
      'Are you sure you want to clear all search history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => dispatch(clearSearchHistory()),
        },
      ]
    );
  };

  const handlePlaceSelected = (placeId) => {
   
    console.log('Selected place:', placeId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search History</Text>
        {searchHistory.length > 0 && (
          <TouchableOpacity style={styles.clearAllButton} onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <SearchHistory onPlaceSelected={handlePlaceSelected} />
      </View>
    </SafeAreaView>
  );
};

export default withErrorBoundary(SearchHistoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clearAllButton: {
    backgroundColor: '#ff4d4f',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  clearAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
