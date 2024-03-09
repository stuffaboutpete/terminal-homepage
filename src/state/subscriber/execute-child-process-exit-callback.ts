import Subscriber from '../type/subscriber';
import Payload from '../type/payload';
import ProcessID from '../../model/application/type/process-id';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'PROCESS_EXIT' && action !== 'PROCESS_DETACH') return;

    const childProcessId = payload as Payload<'PROCESS_EXIT'>;
    const parentProcessId = state.processes[childProcessId].ownerId;

    const callback = state.callbacks.find(callback => {
        if (callback.event !== 'childProcessExit') return false;
        return (callback.parentProcessId === parentProcessId) ? true : false;
    });

    if (callback) {
        setTimeout(() => {
            // TODO I would prefer type inference was done here
            (callback.callback as (processId: ProcessID) => void)(childProcessId);
        }, 1);
    }
};

export default f;
