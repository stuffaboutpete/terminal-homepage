import Subscriber from '../type/subscriber';
import reduxDevTools from './redux-dev-tools';
import backgroundImage from './background-image';
import executeChildProcessExitCallback from './execute-child-process-exit-callback';
import executeChildProcessOutputCallback from './execute-child-process-output-callback';
import executeCommand from './execute-command';
import executeProcessApplicationStateChangeCallback from './execute-process-application-state-change-callback';
import executeProcessErrorCallback from './execute-process-error-callback';
import executeProcessGlobalStateChangeCallback from './execute-process-global-state-change-callback';
import executeProcessGuiMessageCallback from './execute-process-gui-message-callback';
import executeProcessHelpButtonCallback from './execute-process-help-button-callback';
import executeProcessInputCallback from './execute-process-input-callback';
import executeProcessLaunchErrorCallback from './execute-process-launch-error-callback';
import launchTerminal from './launch-terminal';
import processRemove from './process-remove';

const subscribers: Subscriber[] = [
    // Redux Dev Tools must be first in the
    // list or actions may appear out of order
    reduxDevTools,
    backgroundImage,
    executeChildProcessExitCallback,
    executeChildProcessOutputCallback,
    executeCommand,
    executeProcessApplicationStateChangeCallback,
    executeProcessErrorCallback,
    executeProcessGlobalStateChangeCallback,
    executeProcessGuiMessageCallback,
    executeProcessHelpButtonCallback,
    executeProcessInputCallback,
    executeProcessLaunchErrorCallback,
    launchTerminal,
    processRemove
];

export default subscribers;
