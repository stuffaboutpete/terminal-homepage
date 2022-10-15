import Reducer from './type/reducer';
import State from './type/state';
import Action from './type/action';
import Payload from './type/payload';

type T = <A extends Action>(action: A, callback: (state: State, payload: Payload<A>) => void) => Reducer;

const f: T = (action, callback) => (state, _action, payload) => {
    if (action as string === _action as string) {
        callback(state, payload as unknown as Payload<typeof action>);
    }
    return state;
};

export default f;
