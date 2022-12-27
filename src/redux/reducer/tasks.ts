import { ISetTasksAction, ITask } from 'interfaces';
import { arrToMap } from 'utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';
import { SET_TASKS } from 'redux/action-types';

export interface ITasksState {
  entities: {
    [key: string]: ITask;
  };
}

const initialState: ITasksState = {
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder.addCase(SET_TASKS, (state, action) => {
    const { tasks } = <ISetTasksAction>action;
    tasks && (state.entities = arrToMap(tasks));
  });
});
