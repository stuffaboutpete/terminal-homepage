import State from '../../state/type/state';
import Dispatch from '../../state/type/dispatch';
import ApplicationToolkit from './type/application-toolkit';
import globalState from './global-state';

type T = <ApplicationState extends {}>(
    state: State,
    dispatch: Dispatch,
    applicationName: string
) => ApplicationToolkit<ApplicationState>;

// TODO TypeScript error
const f: T = (state, dispatch, applicationName) => {
    const applicationState = state.applicationInstances[applicationName].state;
    return {
        globalState: globalState(state),
        applicationState,
        openWindow: () => dispatch('OPEN_WINDOW', applicationName),
        closeWindow: () => dispatch('CLOSE_WINDOW', applicationName),
        activateCanvas: () => dispatch('ACTIVATE_CANVAS', applicationName),
        deactivateCanvas: () => dispatch('DEACTIVATE_CANVAS', applicationName),
        setState: (newState: {}) => dispatch('UPDATE_APPLICATION_STATE', {
            applicationName,
            state: {
                ...applicationState,
                ...newState
            }
        }),
        executeCommand: (command: string) => dispatch('EXECUTE_COMMAND', command),
        changeDirectory: (directory: string) => dispatch('CHANGE_DIRECTORY', directory),
        setTheme: (theme: 'light' | 'dark' | 'auto') => dispatch('SET_THEME', theme),
        setBackground: (background: number) => dispatch('SET_BACKGROUND', background)
    };
};

export default f;
