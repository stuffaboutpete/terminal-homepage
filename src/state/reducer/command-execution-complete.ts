import actionReducer from '../action-reducer';

export default actionReducer('COMMAND_EXECUTION_COMPLETE', (state, payload) => {
    const lastCommand = state.commandHistory[state.commandHistory.length - 1];
    lastCommand.output = payload.output;
    lastCommand.error = payload.error;
    state.isProcessingCommand = false;
});
