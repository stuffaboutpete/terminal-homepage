import actionReducer from '../action-reducer';

export default actionReducer('WINDOW_TOUCH_END', (state, payload) => {
    state.windowDrag = undefined;
});
