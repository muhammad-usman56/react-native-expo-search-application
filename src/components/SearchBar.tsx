import { clearSearchResults, fetchPlaceDetailsRequest, searchPlacesRequest } from '@/src/redux/actions/placesActions';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { PlaceAutocomplete } from '@/src/types';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onPlaceSelected?: (placeId: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search for places...', onPlaceSelected }) => {
  const dispatch = useAppDispatch();
  const { searchResults, loading, error } = useAppSelector(state => state.places);
  
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  
  useEffect(() => {
    if (query.trim().length > 0) {
      dispatch(searchPlacesRequest(query) as any);
      setShowResults(true);
    } else {
      dispatch(clearSearchResults() as any);
      setShowResults(false);
    }
  }, [query, dispatch]);

  const handlePlaceSelect = useCallback((place: PlaceAutocomplete) => {
    setQuery(place.description);
    setShowResults(false);
    dispatch(fetchPlaceDetailsRequest(place.place_id) as any);
    if (onPlaceSelected) {
      onPlaceSelected(place.place_id);
    }
  }, [dispatch, onPlaceSelected]);

  const handleClear = () => {
    setQuery('');
    setShowResults(false);
    dispatch(clearSearchResults() as any);
  };

  const renderItem = ({ item }: { item: PlaceAutocomplete }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handlePlaceSelect(item)} activeOpacity={0.7}>
      <View style={styles.resultContent}>
        <Text style={styles.mainText} numberOfLines={1}>
          {item.structured_formatting.main_text}
        </Text>
        <Text style={styles.secondaryText} numberOfLines={1}>
          {item.structured_formatting.secondary_text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="small" color="#1890ff" />
          <Text style={styles.emptyText}>Searching...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (query.trim().length > 0 && searchResults.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {showResults && (
        <View style={styles.resultsContainer}>
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={item => item.place_id}
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
              style={styles.resultsList}
            />
          ) : renderEmpty()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#999',
  },
  resultsContainer: {
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  resultsList: {
    maxHeight: 300,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultContent: {
    flex: 1,
  },
  mainText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  secondaryText: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#ff4d4f',
    textAlign: 'center',
  },
});

