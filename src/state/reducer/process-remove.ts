import actionReducer from '../action-reducer';

export default actionReducer('PROCESS_REMOVE', (state, payload) => {
    delete state.processes[payload];
});
