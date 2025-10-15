import { fetchAutocompletePredictions, fetchPlaceDetails } from '@/src/services/placesApi';
import { ApiError, SearchHistoryItem } from '@/src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, debounceTime, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import {
    ADD_TO_SEARCH_HISTORY,
    addToSearchHistory,
    CLEAR_SEARCH_HISTORY,
    FETCH_PLACE_DETAILS_REQUEST,
    fetchPlaceDetailsFailure,
    fetchPlaceDetailsSuccess,
    LOAD_SEARCH_HISTORY_REQUEST,
    loadSearchHistorySuccess,
    PlacesActionTypes,
    REMOVE_FROM_HISTORY,
    SEARCH_PLACES_REQUEST,
    searchPlacesFailure,
    searchPlacesSuccess,
} from '../actions/placesActions';

const SEARCH_HISTORY_KEY = '@maybank_search_history';


export const searchPlacesEpic: Epic<PlacesActionTypes> = action$ =>
  action$.pipe(
    ofType(SEARCH_PLACES_REQUEST),
    debounceTime(500),
    filter(action => action.payload.trim().length > 0),
    switchMap(action =>
      from(fetchAutocompletePredictions(action.payload)).pipe(
        map(results => searchPlacesSuccess(results)),
        catchError((error: ApiError) =>
          of(searchPlacesFailure(error.message || 'Failed to fetch search results'))
        )
      )
    )
  );

export const fetchPlaceDetailsEpic: Epic<PlacesActionTypes> = action$ =>
  action$.pipe(
    ofType(FETCH_PLACE_DETAILS_REQUEST),
    switchMap(action =>
      from(fetchPlaceDetails(action.payload)).pipe(
        mergeMap(placeDetails => {
         
          const historyItem: SearchHistoryItem = {
            id: `${placeDetails.place_id}_${Date.now()}`,
            place: placeDetails,
            searchedAt: Date.now(),
          };
          
          return of(fetchPlaceDetailsSuccess(placeDetails), addToSearchHistory(historyItem));
        }),
        catchError((error: ApiError) =>
          of(fetchPlaceDetailsFailure(error.message || 'Failed to fetch place details'))
        )
      )
    )
  );


export const persistSearchHistoryEpic: Epic<PlacesActionTypes, PlacesActionTypes, any> = (action$, state$: StateObservable<any>) =>
  action$.pipe(
    ofType(ADD_TO_SEARCH_HISTORY, REMOVE_FROM_HISTORY, CLEAR_SEARCH_HISTORY),
    debounceTime(1000),
    switchMap(() => {
      const { searchHistory } = state$.value.places;
      return from(AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory))).pipe(
        switchMap(() => of()),
        catchError(error => {
          console.error('Failed to persist search history:', error);
          return of();
        })
      );
    })
  );

export const loadSearchHistoryEpic: Epic<PlacesActionTypes> = action$ =>
  action$.pipe(
    ofType(LOAD_SEARCH_HISTORY_REQUEST),
    switchMap(() =>
      from(AsyncStorage.getItem(SEARCH_HISTORY_KEY)).pipe(
        map(data => {
          if (data) {
            const history: SearchHistoryItem[] = JSON.parse(data);
            return loadSearchHistorySuccess(history);
          }
          return loadSearchHistorySuccess([]);
        }),
        catchError(error => {
          console.error('Failed to load search history:', error);
          return of(loadSearchHistorySuccess([]));
        })
      )
    )
  );

export const placesEpics = [
  searchPlacesEpic,
  fetchPlaceDetailsEpic,
  persistSearchHistoryEpic,
  loadSearchHistoryEpic,
];

