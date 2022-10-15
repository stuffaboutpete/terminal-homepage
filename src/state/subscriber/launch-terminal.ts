import Subscriber from '../type/subscriber';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'INIT') return;
    dispatch('EXECUTE_COMMAND', 'terminal');
};

export default f;
