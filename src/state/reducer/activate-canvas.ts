import actionReducer from '../action-reducer';

export default actionReducer('ACTIVATE_CANVAS', (state, payload) => {
    state.applicationInstances[payload].canvasActive = true;
});
