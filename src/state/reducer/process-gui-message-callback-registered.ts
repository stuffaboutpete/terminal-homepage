import actionReducer from '../action-reducer';

export default actionReducer('PROCESS_GUI_MESSAGE_CALLBACK_REGISTERED', (state, payload) => {
    const { processId, callback } = payload;
    state.callbacks.push({
        event: 'processGuiMessage',
        processId,
        callback
    });
});
