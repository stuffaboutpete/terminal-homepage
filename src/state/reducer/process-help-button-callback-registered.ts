import actionReducer from '../action-reducer';

export default actionReducer('PROCESS_HELP_BUTTON_CALLBACK_REGISTERED', (state, payload) => {
    const { processId, callback } = payload;
    state.callbacks.push({
        event: 'processHelpButton',
        processId,
        callback
    });
});
