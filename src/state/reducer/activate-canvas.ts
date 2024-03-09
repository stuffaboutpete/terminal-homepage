import actionReducer from '../action-reducer';

export default actionReducer('ACTIVATE_CANVAS', (state, payload) => {
    state.processes[payload].canvasActive = true;
});
