import { ApiError, PlaceAutocomplete, PlaceDetails } from '@/src/types';
import axios from 'axios';

const API_KEY = 'AIzaSyAYbzTXE5nnHkQiMEGSLZAv6_7z82fNN1Q';
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export const fetchAutocompletePredictions = async (input: string): Promise<PlaceAutocomplete[]> => {
  if (!input || input.trim().length === 0) {
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/autocomplete/json`, {
      params: {
        input,
        key: API_KEY,
        types: 'establishment|geocode',
      },
    });

    if (response.data.status === 'OK') {
      return response.data.predictions;
    } else if (response.data.status === 'ZERO_RESULTS') {
      return [];
    }
    
    throw new Error(response.data.error_message || 'Failed to fetch predictions');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        const apiError: ApiError = {
          message: 'Network error. Please check your internet connection.',
          code: 0,
        };
        throw apiError;
      }
      
      const apiError: ApiError = {
        message: error.response?.data?.error_message || error.message,
        status: error.response?.data?.status,
        code: error.response?.status,
      };
      throw apiError;
    }
    throw error;
  }
};

export const fetchPlaceDetails = async (placeId: string): Promise<PlaceDetails> => {
  try {
    const response = await axios.get(`${BASE_URL}/details/json`, {
      params: {
        place_id: placeId,
        key: API_KEY,
        fields: 'place_id,name,formatted_address,geometry,types,photos,rating,user_ratings_total',
      },
    });

    if (response.data.status === 'OK') {
      return response.data.result;
    }
    
    throw new Error(response.data.error_message || 'Failed to fetch place details');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        const apiError: ApiError = {
          message: 'Network error. Please check your internet connection.',
          code: 0,
        };
        throw apiError;
      }
      
      const apiError: ApiError = {
        message: error.response?.data?.error_message || error.message,
        status: error.response?.data?.status,
        code: error.response?.status,
      };
      throw apiError;
    }
    throw error;
  }
};

export const isApiKeyConfigured = () => {
  return API_KEY.length > 0;
};

