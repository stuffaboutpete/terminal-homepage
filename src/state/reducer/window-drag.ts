import actionReducer from '../action-reducer';
import isProcessLaunchFailure from '../../model/application/is-process-launch-failure';

export default actionReducer('WINDOW_DRAG', (state, payload) => {
    if (!state.windowDrag) throw new Error('Unexpected error');

    const process = state.processes[state.windowDrag.processId];
    if (isProcessLaunchFailure(process)) return;

    const window = process.window;
    if (!window) throw new Error('Unexpected error');

    window.x += payload.x - state.windowDrag.lastLocation.x;
    window.y += payload.y - state.windowDrag.lastLocation.y;

    state.windowDrag.lastLocation = payload;
});
