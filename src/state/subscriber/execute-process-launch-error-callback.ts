import Subscriber from '../type/subscriber';
import Payload from '../type/payload';
import ProcessID from '../../model/application/type/process-id';
import isProcessLaunchFailure from '../../model/application/is-process-launch-failure';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'EXECUTE_COMMAND') return;

    const { newProcessId, ownerId } = payload as Payload<'EXECUTE_COMMAND'>;

    if (!isProcessLaunchFailure(state.processes[newProcessId])) return;

    const callback = state.callbacks.find(callback => {
        if (callback.event !== 'childProcessLaunchError') return false;
        return (callback.parentProcessId === ownerId) ? true : false;
    });

    if (callback) {
        setTimeout(() => {
            // TODO I would prefer type inference was done here
            (callback.callback as (processId: ProcessID) => void)(newProcessId);
        }, 1);
    }
};

export default f;
