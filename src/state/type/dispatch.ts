import Action, { Payload } from './action';

type Dispatch = <A extends Action>(action: A, payload: Payload<A>) => void;

export default Dispatch;
