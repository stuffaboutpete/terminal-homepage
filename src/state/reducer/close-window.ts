import actionReducer from '../action-reducer';

export default actionReducer('CLOSE_WINDOW', (state, payload) => {
    state.applicationInstances[payload].window = undefined;
});
