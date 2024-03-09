import Reducer from '../type/reducer';
import activateCanvas from './activate-canvas';
import activateWindow from './activate-window';
import browserSizeChange from './browser-size-change';
import childProcessErrorCallbackRegistered from './child-process-error-callback-registered';
import childProcessLaunchErrorCallbackRegistered from './child-process-launch-error-callback-registered';
import childProcessExitCallbackRegistered from './child-process-exit-callback-registered';
import childProcessOutputCallbackRegistered from './child-process-output-callback-registered';
import deactivateWindow from './deactivate-window';
import deactivateCanvas from './deactivate-canvas';
import executeCommand from './execute-command';
import processApplicationStateChangeCallbackRegistered from './process-application-state-change-callback-registered';
import processDetach from './process-detach';
import processExit from './process-exit';
import processGlobalStateChangeCallbackRegistered from './process-global-state-change-callback-registered';
import processGuiMessageCallbackRegistered from './process-gui-message-callback-registered';
import processHelpButtonCallbackRegistered from './process-help-button-callback-registered';
import processInputCallbackRegistered from './process-input-callback-registered';
import processRemove from './process-remove';
import setWindowTitle from './set-window-title';
import updateProcessState from './update-process-state';
import windowDrag from './window-drag';
import windowTouch from './window-touch';
import windowTouchEnd from './window-touch-end';

const reducers: Reducer[] = [
    activateCanvas,
    activateWindow,
    browserSizeChange,
    childProcessErrorCallbackRegistered,
    childProcessExitCallbackRegistered,
    childProcessLaunchErrorCallbackRegistered,
    childProcessOutputCallbackRegistered,
    deactivateCanvas,
    deactivateWindow,
    executeCommand,
    processApplicationStateChangeCallbackRegistered,
    processDetach,
    processExit,
    processGlobalStateChangeCallbackRegistered,
    processGuiMessageCallbackRegistered,
    processHelpButtonCallbackRegistered,
    processInputCallbackRegistered,
    processRemove,
    setWindowTitle,
    updateProcessState,
    windowDrag,
    windowTouch,
    windowTouchEnd,
];

export default reducers;
