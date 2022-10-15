import State from './state';
import Dispatch from './dispatch';
import Action from './action';
import Payload from './payload';

type Subscriber = <A extends Action>(action: A, payload: Payload<A>, state: State, previousState: State, dispatch: Dispatch) => void;

export default Subscriber;
