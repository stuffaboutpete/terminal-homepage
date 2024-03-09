import State from '../../state/type/state';
import GlobalState from './type/global-state';
import Process from './type/process';
import isProcess from './is-process';

type T = (state: State) => GlobalState;

const f: T = state => ({
    files: state.files,
    theme: state.theme,
    backgroundImage: state.backgroundImage,
    browserSize: state.browserSize,
    windowPositions: Object.keys(state.processes)
        .map(processId => state.processes[processId])
        .filter(isProcess)
        .map(process => (process as Process).window)
        .filter(window => window !== undefined)
        .map(window => {
            if (!window) throw new Error('Unexpected error');
            return window;
        })
});

export default f;
