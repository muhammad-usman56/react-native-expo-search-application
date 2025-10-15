export interface PlaceAutocomplete {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
  photos?: Array<{
    photo_reference: string;
  }>;
  rating?: number;
  user_ratings_total?: number;
}

export interface SearchHistoryItem {
  id: string;
  place: PlaceDetails;
  searchedAt: number;
}

export interface PlacesState {
  searchResults: PlaceAutocomplete[];
  selectedPlace: PlaceDetails | null;
  searchHistory: SearchHistoryItem[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export interface ApiError {
  message: string;
  status?: string;
  code?: number;
}

