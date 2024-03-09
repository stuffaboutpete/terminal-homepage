import actionReducer from '../action-reducer';

export default actionReducer('PROCESS_APPLICATION_STATE_CHANGE_CALLBACK_REGISTERED', (state, payload) => {
    const { processId, callback } = payload;
    state.callbacks.push({
        event: 'processApplicationStateChange',
        processId,
        callback
    });
});
