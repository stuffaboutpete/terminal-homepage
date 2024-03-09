import Process from '../../model/application/type/process';
import actionReducer from '../action-reducer';

export default actionReducer('DEACTIVATE_WINDOW', (state, payload) => {
    (state.processes[payload] as Process).window = undefined;
});
