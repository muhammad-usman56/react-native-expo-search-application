import { PlacesState } from '@/src/types';
import { AnyAction } from '@reduxjs/toolkit';
import {
    ADD_TO_SEARCH_HISTORY,
    CLEAR_ERROR,
    CLEAR_SEARCH_HISTORY,
    CLEAR_SEARCH_RESULTS,
    FETCH_PLACE_DETAILS_FAILURE,
    FETCH_PLACE_DETAILS_REQUEST,
    FETCH_PLACE_DETAILS_SUCCESS,
    LOAD_SEARCH_HISTORY_SUCCESS,
    REMOVE_FROM_HISTORY,
    SEARCH_PLACES_FAILURE,
    SEARCH_PLACES_REQUEST,
    SEARCH_PLACES_SUCCESS,
} from '../actions/placesActions';

const initialState: PlacesState = {
  searchResults: [],
  selectedPlace: null,
  searchHistory: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const placesReducer = (state = initialState, action: AnyAction): PlacesState => {
  switch (action.type) {
    case SEARCH_PLACES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        searchQuery: action.payload,
      };

    case SEARCH_PLACES_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        error: null,
      };

    case SEARCH_PLACES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        searchResults: [],
      };

    case FETCH_PLACE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PLACE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPlace: action.payload,
        error: null,
      };

    case FETCH_PLACE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_TO_SEARCH_HISTORY:
    
      const newHistory = [action.payload, ...state.searchHistory]
        .filter((item, idx, arr) => 
          idx === arr.findIndex(t => t.place.place_id === item.place.place_id)
        )
        .slice(0, 50);
      
      return {
        ...state,
        searchHistory: newHistory,
      };

    case REMOVE_FROM_HISTORY:
      return {
        ...state,
        searchHistory: state.searchHistory.filter(item => item.id !== action.payload),
      };

    case CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: [],
      };

    case LOAD_SEARCH_HISTORY_SUCCESS:
      return {
        ...state,
        searchHistory: action.payload,
      };

    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
        searchQuery: '',
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

