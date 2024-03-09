import actionReducer from '../action-reducer';
import applications from '../../application';
import fromList from '../../model/application/from-list';

export default actionReducer('EXECUTE_COMMAND', (state, payload) => {
    const { command, ownerId, newProcessId } = payload;
    const applicationName = command.split(/\s/g)[0];
    const application = fromList(applications, applicationName);

    if (application) {
        state.processes[newProcessId] = {
            ownerId,
            name: applicationName,
            state: application.defaultState || {},
            detached: false,
            canvasActive: false,
        };
    } else {
        state.processes[newProcessId] = {
            ownerId,
            command,
            failure: 'unknown-application'
        };
    }
});
