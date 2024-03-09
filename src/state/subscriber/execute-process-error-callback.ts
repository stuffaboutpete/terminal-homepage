import Subscriber from '../type/subscriber';
import Payload from '../type/payload';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'PROCESS_ERROR') return;

    const { processId: childProcessId, error } = payload as Payload<'PROCESS_ERROR'>;
    const parentProcessId = state.processes[childProcessId].ownerId;

    const callback = state.callbacks.find(callback => {
        if (callback.event !== 'childProcessError') return false;
        return (callback.parentProcessId === parentProcessId) ? true : false;
    });

    if (callback) {
        setTimeout(() => {
            callback.callback(childProcessId, error);
        }, 1);
    }

};

export default f;
