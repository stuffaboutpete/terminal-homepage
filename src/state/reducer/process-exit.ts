import actionReducer from '../action-reducer';
import isProcessLaunchFailure from '../../model/application/is-process-launch-failure';

export default actionReducer('PROCESS_EXIT', (state, payload) => {
    const process = state.processes[payload];

    if (isProcessLaunchFailure(process)) return;

    process.detached = true;
    process.window = undefined;
    process.canvasActive = false;
});
