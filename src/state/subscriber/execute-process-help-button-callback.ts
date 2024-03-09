import Subscriber from '../type/subscriber';
import Payload from '../type/payload';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'PROCESS_HELP_BUTTON') return;

    const processId = payload as Payload<'PROCESS_HELP_BUTTON'>;

    const callback = state.callbacks.find(callback => {
        if (callback.event !== 'processHelpButton') return false;
        return (callback.processId === processId) ? true : false;
    });

    if (callback) {
        setTimeout(() => {
            // TODO I would prefer type inference was done here
            (callback.callback as () => void)();
        }, 1);
    }

};

export default f;
