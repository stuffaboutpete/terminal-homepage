import Subscriber from '../type/subscriber';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'INIT') return;
    dispatch('EXECUTE_COMMAND', {
        command: 'terminal',
        ownerId: '0',
        newProcessId: '1'
    });
};

export default f;
