import { combineReducers } from 'redux';
import { placesReducer } from './placesReducer';

const rootReducer = combineReducers({
  places: placesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

