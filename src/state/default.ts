import State from './type/state';
import files from '../directory-structure';

const defaultState: State = {
    windowDrag: undefined,
    files,
    currentDirectory: '/',
    theme: 'dark',
    backgroundImage: 986,
    fullScreen: false,
    browserSize: {
        width: 0,
        height: 0
    },
    isProcessingCommand: false,
    applicationInstances: {},
    commandHistory: [],
};

export default defaultState;
