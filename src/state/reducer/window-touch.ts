import actionReducer from '../action-reducer';

export default actionReducer('WINDOW_TOUCH', (state, payload) => {
    const window = state.applicationInstances[payload.applicationName].window;
    if (!window) throw new Error('Unexpected error');

    // TODO This belongs in model somewhere
    const highestZIndex = Math.max(0, ...Object.values(state.applicationInstances)
        .map(application => application.window)
        .filter(window => window !== undefined)
        .map(window => {
            if (!window) throw new Error('Unexpected error');
            return window.zIndex;
        }));

    window.zIndex = highestZIndex + 1;

    state.windowDrag = {
        applicationName: payload.applicationName,
        lastLocation: payload.position
    };
});
