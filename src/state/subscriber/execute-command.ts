import Subscriber from '../type/subscriber';
import Payload from '../type/payload';
import applications from '../../application';
import fromList from '../../model/application/from-list';
import applicationToolkit from '../../model/application/application-toolkit';

const f: Subscriber = (action, payload, state, previousState, dispatch, getState) => {
    if (action !== 'EXECUTE_COMMAND') return;

    const existingProcesses = Object.keys(previousState.processes);
    const currentProcesses = Object.keys(state.processes);
    const newProcessId = currentProcesses.find(processId => !existingProcesses.includes(processId))!;

    const { command } = payload as Payload<'EXECUTE_COMMAND'>;
    const [applicationName, ...args] = command.split(/\s/g);
    const application = fromList(applications, applicationName);

    if (!application) return;

    setTimeout(() => {
        application.initialize(
            args,
            applicationToolkit(getState, dispatch, newProcessId)
        );
    }, 1);

    // TODO In changing architecture to be process
    // based, we removed some functionality. If a
    // command was not valid, we evaluated it as
    // JavaScript. It would be nice to have this
    // again in the new architecture.
};

export default f;
