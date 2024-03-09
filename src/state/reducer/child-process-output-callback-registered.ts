import actionReducer from '../action-reducer';

export default actionReducer('CHILD_PROCESS_OUTPUT_CALLBACK_REGISTERED', (state, payload) => {
    const { parentProcessId, callback } = payload;
    state.callbacks.push({
        event: 'childProcessOutput',
        parentProcessId,
        callback
    });
});
