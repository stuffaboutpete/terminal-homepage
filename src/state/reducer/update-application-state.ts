import actionReducer from '../action-reducer';

export default actionReducer('UPDATE_APPLICATION_STATE', (state, payload) => {
    const { applicationName, state: newState } = payload;
    state.applicationInstances[applicationName].state = newState;
});
