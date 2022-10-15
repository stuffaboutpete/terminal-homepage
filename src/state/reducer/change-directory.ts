import actionReducer from '../action-reducer';

export default actionReducer('CHANGE_DIRECTORY', (state, payload) => {
    state.currentDirectory = payload;
});
