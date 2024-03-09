import State from './state';

const defaultState: State = {
    input: '',
    history: [],
    historyPointer: -1,
    currentDirectory: '/',
    activeProcess: false,
    commandHistory: []
};

export default defaultState;
