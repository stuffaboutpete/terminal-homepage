import actionReducer from '../action-reducer';

export default actionReducer('DEACTIVATE_CANVAS', (state, payload) => {
    state.applicationInstances[payload].canvasActive = false;
});
