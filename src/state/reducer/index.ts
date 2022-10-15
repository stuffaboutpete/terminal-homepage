import Reducer from '../type/reducer';
import browserSizeChange from './browser-size-change';
import changeDirectory from './change-directory';
import closeWindow from './close-window';
import commandExecutionComplete from './command-execution-complete';
import executeCommand from './execute-command';
import openWindow from './open-window';
import updateApplicationState from './update-application-state';
import windowDrag from './window-drag';
import windowTouch from './window-touch';
import windowTouchEnd from './window-touch-end';

const reducers: Reducer[] = [
    browserSizeChange,
    changeDirectory,
    closeWindow,
    commandExecutionComplete,
    executeCommand,
    openWindow,
    updateApplicationState,
    windowDrag,
    windowTouch,
    windowTouchEnd,
];

export default reducers;
