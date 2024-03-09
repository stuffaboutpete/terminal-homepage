import Subscriber from '../type/subscriber';
import Payload from '../type/payload';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'PROCESS_OUTPUT') return;

    const { processId: childProcessId, output } = payload as Payload<'PROCESS_OUTPUT'>;
    const parentProcessId = state.processes[childProcessId].ownerId;

    const callback = state.callbacks.find(callback => {
        if (callback.event !== 'childProcessOutput') return false;
        return (callback.parentProcessId === parentProcessId) ? true : false;
    });

    if (callback) {
        setTimeout(() => {
            callback.callback(childProcessId, output);
        }, 1);
    }
};

export default f;
