import actionReducer from '../action-reducer';

export default actionReducer('PROCESS_INPUT_CALLBACK_REGISTERED', (state, payload) => {
    const { processId, callback } = payload;
    state.callbacks.push({
        event: 'processInput',
        processId,
        callback
    });
});
