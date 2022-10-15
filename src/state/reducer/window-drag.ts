import actionReducer from '../action-reducer';

export default actionReducer('WINDOW_DRAG', (state, payload) => {
    if (!state.windowDrag) throw new Error('Unexpected error');
    const window = state.applicationInstances[state.windowDrag.applicationName].window;
    if (!window) throw new Error('Unexpected error');

    window.x += payload.x - state.windowDrag.lastLocation.x;
    window.y += payload.y - state.windowDrag.lastLocation.y;

    state.windowDrag.lastLocation = payload;
});
