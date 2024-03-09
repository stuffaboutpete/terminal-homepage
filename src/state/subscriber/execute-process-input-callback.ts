import Subscriber from '../type/subscriber';
import Payload from '../type/payload';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'MESSAGE_CHILD_PROCESS') return;

    const { childProcessId, message } = payload as Payload<'MESSAGE_CHILD_PROCESS'>;

    const callback = state.callbacks.find(callback => {
        if (callback.event !== 'processInput') return false;
        return (callback.processId === childProcessId) ? true : false;
    });

    if (callback) {
        setTimeout(() => {
            // TODO I would prefer type inference was done here
            (callback.callback as (input: string) => void)(message);
        }, 1);
    }
};

export default f;
