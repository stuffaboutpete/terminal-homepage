import actionReducer from '../action-reducer';

export default actionReducer('DEACTIVATE_CANVAS', (state, payload) => {
    state.processes[payload].canvasActive = false;
});
