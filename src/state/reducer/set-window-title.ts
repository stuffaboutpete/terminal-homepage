import actionReducer from '../action-reducer';
import Process from '../../model/application/type/process';

export default actionReducer('SET_WINDOW_TITLE', (state, payload) => {
    const { processId, title } = payload;
    const process = state.processes[processId] as Process;

    if (process.window) process.window.title = title;
});
