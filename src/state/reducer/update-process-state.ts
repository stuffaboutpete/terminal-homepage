import actionReducer from '../action-reducer';
import isProcessLaunchFailure from '../../model/application/is-process-launch-failure';

export default actionReducer('UPDATE_PROCESS_STATE', (state, payload) => {
    const { processId, state: newState } = payload;
    const process = state.processes[processId];
    if (isProcessLaunchFailure(process)) return;
    process.state = newState;
});
