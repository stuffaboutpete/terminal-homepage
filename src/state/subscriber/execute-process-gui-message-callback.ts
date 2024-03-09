import Subscriber from '../type/subscriber';
import Payload from '../type/payload';
import ProcessID from '../../model/application/type/process-id';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'PROCESS_GUI_MESSAGE') return;

    const { processId, message } = payload as Payload<'PROCESS_GUI_MESSAGE'>;

    const callback = state.callbacks.find(callback => {
        if (callback.event !== 'processGuiMessage') return false;
        return (callback.processId === processId) ? true : false;
    });

    if (callback) {
        setTimeout(() => {
            // TODO I would prefer type inference was done here
            (callback.callback as (message: unknown) => void)(message);
        }, 1);
    }
};

export default f;
