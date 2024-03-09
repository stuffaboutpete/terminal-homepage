import Subscriber from '../type/subscriber';
import Payload from '../type/payload';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'UPDATE_PROCESS_STATE') return;

    const { processId, state: applicationState } = payload as Payload<'UPDATE_PROCESS_STATE'>;

    const callback = state.callbacks.find(callback => {
        if (callback.event !== 'processApplicationStateChange') return false;
        return (callback.processId === processId) ? true : false;
    });

    if (callback) {
        setTimeout(() => {
            // TODO I would prefer type inference was done here
            // TODO any
            (callback.callback as (state: any) => void)(applicationState);
        }, 1);
    }

};

export default f;
