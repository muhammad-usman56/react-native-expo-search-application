import { PlaceAutocomplete, PlaceDetails, SearchHistoryItem } from '@/src/types';


export const SEARCH_PLACES_REQUEST = 'SEARCH_PLACES_REQUEST';
export const SEARCH_PLACES_SUCCESS = 'SEARCH_PLACES_SUCCESS';
export const SEARCH_PLACES_FAILURE = 'SEARCH_PLACES_FAILURE';


export const FETCH_PLACE_DETAILS_REQUEST = 'FETCH_PLACE_DETAILS_REQUEST';
export const FETCH_PLACE_DETAILS_SUCCESS = 'FETCH_PLACE_DETAILS_SUCCESS';
export const FETCH_PLACE_DETAILS_FAILURE = 'FETCH_PLACE_DETAILS_FAILURE';

export const ADD_TO_SEARCH_HISTORY = 'ADD_TO_SEARCH_HISTORY';
export const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';
export const REMOVE_FROM_HISTORY = 'REMOVE_FROM_HISTORY';
export const LOAD_SEARCH_HISTORY_REQUEST = 'LOAD_SEARCH_HISTORY_REQUEST';
export const LOAD_SEARCH_HISTORY_SUCCESS = 'LOAD_SEARCH_HISTORY_SUCCESS';


export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export interface SearchPlacesRequestAction {
  type: typeof SEARCH_PLACES_REQUEST;
  payload: string;
}

export interface SearchPlacesSuccessAction {
  type: typeof SEARCH_PLACES_SUCCESS;
  payload: PlaceAutocomplete[];
}

export interface SearchPlacesFailureAction {
  type: typeof SEARCH_PLACES_FAILURE;
  payload: string;
}

export interface FetchPlaceDetailsRequestAction {
  type: typeof FETCH_PLACE_DETAILS_REQUEST;
  payload: string;
}

export interface FetchPlaceDetailsSuccessAction {
  type: typeof FETCH_PLACE_DETAILS_SUCCESS;
  payload: PlaceDetails;
}

export interface FetchPlaceDetailsFailureAction {
  type: typeof FETCH_PLACE_DETAILS_FAILURE;
  payload: string;
}

export interface AddToSearchHistoryAction {
  type: typeof ADD_TO_SEARCH_HISTORY;
  payload: SearchHistoryItem;
}

export interface ClearSearchHistoryAction {
  type: typeof CLEAR_SEARCH_HISTORY;
}

export interface RemoveFromHistoryAction {
  type: typeof REMOVE_FROM_HISTORY;
  payload: string; // history item id
}

export interface LoadSearchHistoryRequestAction {
  type: typeof LOAD_SEARCH_HISTORY_REQUEST;
}

export interface LoadSearchHistorySuccessAction {
  type: typeof LOAD_SEARCH_HISTORY_SUCCESS;
  payload: SearchHistoryItem[];
}

export interface ClearSearchResultsAction {
  type: typeof CLEAR_SEARCH_RESULTS;
}

export interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
}

export type PlacesActionTypes =
  | SearchPlacesRequestAction
  | SearchPlacesSuccessAction
  | SearchPlacesFailureAction
  | FetchPlaceDetailsRequestAction
  | FetchPlaceDetailsSuccessAction
  | FetchPlaceDetailsFailureAction
  | AddToSearchHistoryAction
  | ClearSearchHistoryAction
  | RemoveFromHistoryAction
  | LoadSearchHistoryRequestAction
  | LoadSearchHistorySuccessAction
  | ClearSearchResultsAction
  | ClearErrorAction;


export const searchPlacesRequest = (query: string): SearchPlacesRequestAction => ({
  type: SEARCH_PLACES_REQUEST,
  payload: query,
});

export const searchPlacesSuccess = (results: PlaceAutocomplete[]): SearchPlacesSuccessAction => ({
  type: SEARCH_PLACES_SUCCESS,
  payload: results,
});

export const searchPlacesFailure = (error: string): SearchPlacesFailureAction => ({
  type: SEARCH_PLACES_FAILURE,
  payload: error,
});

export const fetchPlaceDetailsRequest = (placeId: string): FetchPlaceDetailsRequestAction => ({
  type: FETCH_PLACE_DETAILS_REQUEST,
  payload: placeId,
});

export const fetchPlaceDetailsSuccess = (place: PlaceDetails): FetchPlaceDetailsSuccessAction => ({
  type: FETCH_PLACE_DETAILS_SUCCESS,
  payload: place,
});

export const fetchPlaceDetailsFailure = (error: string): FetchPlaceDetailsFailureAction => ({
  type: FETCH_PLACE_DETAILS_FAILURE,
  payload: error,
});

export const addToSearchHistory = (historyItem: SearchHistoryItem): AddToSearchHistoryAction => ({
  type: ADD_TO_SEARCH_HISTORY,
  payload: historyItem,
});

export const clearSearchHistory = (): ClearSearchHistoryAction => ({
  type: CLEAR_SEARCH_HISTORY,
});

export const removeFromHistory = (id: string): RemoveFromHistoryAction => ({
  type: REMOVE_FROM_HISTORY,
  payload: id,
});

export const loadSearchHistoryRequest = (): LoadSearchHistoryRequestAction => ({
  type: LOAD_SEARCH_HISTORY_REQUEST,
});

export const loadSearchHistorySuccess = (history: SearchHistoryItem[]): LoadSearchHistorySuccessAction => ({
  type: LOAD_SEARCH_HISTORY_SUCCESS,
  payload: history,
});

export const clearSearchResults = (): ClearSearchResultsAction => ({
  type: CLEAR_SEARCH_RESULTS,
});

export const clearError = (): ClearErrorAction => ({
  type: CLEAR_ERROR,
});

