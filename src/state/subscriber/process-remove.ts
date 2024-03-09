import Subscriber from '../type/subscriber';
import Payload from '../type/payload';
import ProcessID from '../../model/application/type/process-id';
import isProcessLaunchFailure from '../../model/application/is-process-launch-failure';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    const actions = [
        'PROCESS_EXIT',
        'PROCESS_DETACH',
        'PROCESS_ERROR',
        'DEACTIVATE_WINDOW',
        'DEACTIVATE_CANVAS'
    ];

    if (!actions.includes(action)) return;

    const processId = (action === 'PROCESS_ERROR')
        ? (payload as Payload<'PROCESS_ERROR'>).processId
        : payload as ProcessID;

    const process = state.processes[processId];

    if (isProcessLaunchFailure(process)) return;
    if (process.detached === false || process.window || process.canvasActive) return;

    dispatch('PROCESS_REMOVE', processId);
};

export default f;
