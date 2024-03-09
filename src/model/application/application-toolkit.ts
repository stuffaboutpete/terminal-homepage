import State from '../../state/type/state';
import Dispatch from '../../state/type/dispatch';
import GlobalState from './type/global-state';
import ApplicationToolkit from './type/application-toolkit';
import globalState from './global-state';
import Process from './type/process';
import ProcessID from './type/process-id';

type T = <ApplicationState extends {}, CanvasState extends {}>(
    getState: () => State,
    dispatch: Dispatch,
    processId: ProcessID
) => ApplicationToolkit<ApplicationState, CanvasState>;

const f: T = (getState, dispatch, processId) => ({
    globalState: () => globalState(getState()),
    applicationState: () => (getState().processes[processId] as Process).state as any, // TODO any
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
    setCanvasState: (newState: {}) => dispatch('UPDATE_CANVAS_STATE', {
        processId,
        state: newState
    }),
    onGlobalStateChange: callback => dispatch('PROCESS_GLOBAL_STATE_CHANGE_CALLBACK_REGISTERED', {
        processId,
        callback
    }),
    onApplicationStateChange: callback => dispatch('PROCESS_APPLICATION_STATE_CHANGE_CALLBACK_REGISTERED', {
        processId,
        callback
    }),
    onInput: callback => dispatch('PROCESS_INPUT_CALLBACK_REGISTERED', {
        processId,
        callback
    }),
    output: output => dispatch('PROCESS_OUTPUT', {
        processId,
        output
    }),
    error: error => dispatch('PROCESS_ERROR', {
        processId,
        error
    }),
    detach: () => dispatch('PROCESS_DETACH', processId),
    exit: () => dispatch('PROCESS_EXIT', processId),
    messageChildProcess: (childProcessId, message) => dispatch('MESSAGE_CHILD_PROCESS', {
        childProcessId: childProcessId,
        message
    }),
    activateWindow: title => dispatch('ACTIVATE_WINDOW', {
        processId,
        title
    }),
    deactivateWindow: () => dispatch('DEACTIVATE_WINDOW', processId),
    activateCanvas: () => dispatch('ACTIVATE_CANVAS', processId),
    deactivateCanvas: () => dispatch('DEACTIVATE_CANVAS', processId),
    setWindowTitle: title => dispatch('SET_WINDOW_TITLE', {
        processId,
        title
    }),
    onGuiMessage: callback => dispatch('PROCESS_GUI_MESSAGE_CALLBACK_REGISTERED', {
        processId,
        callback
    }),
    onHelpButton: callback => dispatch('PROCESS_HELP_BUTTON_CALLBACK_REGISTERED', {
        processId,
        callback
    }),
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
    onChildProcessOutput: callback => dispatch('CHILD_PROCESS_OUTPUT_CALLBACK_REGISTERED', {
        parentProcessId: processId,
        callback
    }),
    onChildProcessExit: callback => dispatch('CHILD_PROCESS_EXIT_CALLBACK_REGISTERED', {
        parentProcessId: processId,
        callback
    }),
    onChildProcessError: callback => dispatch('CHILD_PROCESS_ERROR_CALLBACK_REGISTERED', {
        parentProcessId: processId,
        callback
    }),
    onChildProcessLaunchError: callback => dispatch('CHILD_PROCESS_LAUNCH_ERROR_CALLBACK_REGISTERED', {
        parentProcessId: processId,
        callback
    }),
    setTheme: (theme: 'light' | 'dark' | 'auto') => dispatch('SET_THEME', theme),
    setBackground: (background: number) => dispatch('SET_BACKGROUND', background),
    flipWindow: () => { }
});

export default f;
