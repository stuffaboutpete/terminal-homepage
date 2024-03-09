import Subscriber from '../type/subscriber';
import GlobalState from '../../model/application/type/global-state';
import globalState from '../../model/application/global-state';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    // TODO This approach has the potential
    // to affect performance negatively. Maybe
    // only respond to a whitelist of actions.

    const oldState = globalState(previousState);
    const newState = globalState(state);

    // TODO Use a deepEquals function
    if (JSON.stringify(oldState) === JSON.stringify(newState)) return;

    const callbacks = state.callbacks.filter(callback => callback.event === 'processGlobalStateChange');

    callbacks.forEach(callback => {
        setTimeout(() => {
            // TODO I would prefer type inference was done here
            (callback.callback as (state: GlobalState) => void)(newState);
        }, 1);
    });
};

export default f;
