import { combineReducers } from 'redux';
import boards from './boards';
import columns from './columns';
import tasks from './tasks';
import users from './users';
import session from './session';
import { api } from '../api';

const rootReducer = combineReducers({
  boards,
  columns,
  tasks,
  users,
  session,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
