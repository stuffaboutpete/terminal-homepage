import Subscriber from '../type/subscriber';
import reduxDevTools from './redux-dev-tools';
import backgroundImage from './background-image';
import executeCommand from './execute-command';
import launchTerminal from './launch-terminal';

const subscribers: Subscriber[] = [
    // Redux Dev Tools must be first in the
    // list or actions may appear out of order
    reduxDevTools,
    backgroundImage,
    executeCommand,
    launchTerminal
];

export default subscribers;
