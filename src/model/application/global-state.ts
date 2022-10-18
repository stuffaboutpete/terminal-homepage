import State from '../../state/type/state';
import GlobalState from './type/global-state';

type T = (state: State) => GlobalState;

const f: T = state => ({
    files: state.files,
    currentDirectory: state.currentDirectory,
    theme: state.theme,
    backgroundImage: state.backgroundImage,
    browserSize: state.browserSize,
    isProcessingCommand: state.isProcessingCommand,
    commandHistory: state.commandHistory,
    windowPositions: Object.keys(state.applicationInstances)
        .map(applicationName => state.applicationInstances[applicationName].window)
        .filter(window => window !== undefined)
        .map(window => {
            if (!window) throw new Error('Unexpected error');
            return window;
        })
});

export default f;
