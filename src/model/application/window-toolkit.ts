import State from '../../state/type/state';
import Dispatch from '../../state/type/dispatch';
import WindowToolkit from './type/window-toolkit';
import globalState from './global-state';
import Process from './type/process';
import ProcessID from './type/process-id';

type T = <ApplicationState extends {}>(
    getState: () => State,
    dispatch: Dispatch,
    processId: ProcessID
) => WindowToolkit<ApplicationState>;

const f: T = (getState, dispatch, processId) => ({
    globalState: globalState(getState()),
    applicationState: (getState().processes[processId] as Process).state as any,
    setState: (arg: any) => { // TODO any
        const applicationState = (getState().processes[processId] as Process).state as any; // TODO any
        const newState = (typeof arg === 'function') ? arg(applicationState) : arg;
        dispatch('UPDATE_PROCESS_STATE', {
            processId,
            state: {
                ...applicationState,
                ...newState
            }
        });
    },
    executeCommand: (command: string) => {
        // TODO Note about why ID here
        const newProcessId = Math.random().toString(16).slice(2) // TODO Move ID function
        dispatch('EXECUTE_COMMAND', {
            command,
            ownerId: processId,
            newProcessId
        });
        return newProcessId;
    },
    messageApplication: message => dispatch('PROCESS_GUI_MESSAGE', {
        processId,
        message
    }),
    deactivateWindow: () => {},
    exit: () => {}
});

export default f;
