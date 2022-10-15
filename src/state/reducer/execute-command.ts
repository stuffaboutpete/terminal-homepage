import actionReducer from '../action-reducer';
import applications from '../../application';
import fromList from '../../model/application/from-list';

export default actionReducer('EXECUTE_COMMAND', (state, payload) => {
    if (payload === 'clear' || payload === 'c') { // TODO This smells
        state.commandHistory = [];
        return;
    }

    state.commandHistory.push({
        input: payload,
        output: undefined
    });

    state.isProcessingCommand = true;

    const applicationName = payload.split(/\s/g)[0];
    const application = fromList(applications, applicationName);

    if (application) {
        if (!state.applicationInstances[applicationName]) {
            state.applicationInstances[applicationName] = {
                state: application.defaultState || {}
            };
        }
    }
});
