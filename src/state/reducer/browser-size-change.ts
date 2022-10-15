import actionReducer from '../action-reducer';

export default actionReducer('BROWSER_SIZE_CHANGE', (state, payload) => {
    state.browserSize = payload;
});
