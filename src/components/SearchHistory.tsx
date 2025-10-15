import { clearSearchHistory, fetchPlaceDetailsRequest, removeFromHistory } from '@/src/redux/actions/placesActions';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { SearchHistoryItem } from '@/src/types';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SearchHistoryProps {
  onPlaceSelected?: (placeId: string) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ onPlaceSelected }) => {
  const dispatch = useAppDispatch();
  const { searchHistory } = useAppSelector(state => state.places);

  const handlePlaceSelect = useCallback((item: SearchHistoryItem) => {
    dispatch(fetchPlaceDetailsRequest(item.place.place_id) as any);
    if (onPlaceSelected) {
      onPlaceSelected(item.place.place_id);
    }
  }, [dispatch, onPlaceSelected]);

  const handleDelete = (id: string) => {
    dispatch(removeFromHistory(id) as any);
  };

  const handleClearAll = () => {
    dispatch(clearSearchHistory() as any);
  };

  // format time like "5m ago", "2h ago", etc
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  };

  const renderItem = ({ item }: { item: SearchHistoryItem }) => (
    <View style={styles.historyItem}>
      <TouchableOpacity style={styles.itemContent} onPress={() => handlePlaceSelect(item)} activeOpacity={0.7}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📍</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.placeName} numberOfLines={1}>
            {item.place.name}
          </Text>
          <Text style={styles.placeAddress} numberOfLines={1}>
            {item.place.formatted_address}
          </Text>
          <Text style={styles.timestamp}>{formatTime(item.searchedAt)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Searches</Text>
        {searchHistory.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {searchHistory.length > 0 ? (
        <FlatList
          data={searchHistory}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>No search history</Text>
          <Text style={styles.emptyText}>Your searched places will appear here</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clearAllText: {
    fontSize: 14,
    color: '#ff4d4f',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteIcon: {
    fontSize: 20,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

