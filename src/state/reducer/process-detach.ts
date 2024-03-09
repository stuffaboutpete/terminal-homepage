import actionReducer from '../action-reducer';
import isProcess from '../../model/application/is-process';

export default actionReducer('PROCESS_DETACH', (state, payload) => {
    const process = state.processes[payload];
    if (isProcess(process)) process.detached = true;
});
