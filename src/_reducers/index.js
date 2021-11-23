import { combineReducers } from 'redux';
import { chars } from './chars.reducer';
import { episodes } from './episodes.reducer';
import { generic } from './generic.reducer';

const rootReducer = combineReducers({
  chars,
  episodes,
  generic
});

export default rootReducer;