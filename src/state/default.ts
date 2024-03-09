import State from './type/state';
import files from '../directory-structure';

const defaultState: State = {
    windowDrag: undefined,
    files,
    theme: 'dark',
    backgroundImage: 986,
    fullScreen: false,
    browserSize: {
        width: 0,
        height: 0
    },
    processes: {},
    callbacks: []
};

export default defaultState;
