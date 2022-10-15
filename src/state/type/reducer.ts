import State from './state';
import Action, { Payload } from './action';

type Reducer = <A extends Action>(state: State, action: A, payload: Payload<A>) => State;

export default Reducer;
