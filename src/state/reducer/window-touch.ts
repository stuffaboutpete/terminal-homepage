import actionReducer from '../action-reducer';
import isProcessLaunchFailure from '../../model/application/is-process-launch-failure';
import isProcess from '../../model/application/is-process';

export default actionReducer('WINDOW_TOUCH', (state, payload) => {
    const process = state.processes[payload.processId];

    if (isProcessLaunchFailure(process)) return;

    const window = process.window;
    if (!window) throw new Error('Unexpected error');

    // TODO This belongs in model somewhere
    const highestZIndex = Math.max(0, ...Object.values(state.processes)
        .filter(isProcess)
        .map(process => process.window)
        .filter(window => window !== undefined)
        .map(window => {
            if (!window) throw new Error('Unexpected error');
            return window.zIndex;
        }));

    window.zIndex = highestZIndex + 1;

    state.windowDrag = {
        processId: payload.processId,
        lastLocation: payload.position
    };
});
