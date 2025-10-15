import { configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { PlacesActionTypes } from './actions/placesActions';
import { placesEpics } from './epics/placesEpics';
import { placesReducer } from './reducers/placesReducer';

const rootEpic = combineEpics(...placesEpics);
const epicMiddleware = createEpicMiddleware<PlacesActionTypes, PlacesActionTypes>();

export const store = configureStore({
  reducer: {
    places: placesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic as any);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
