/**
 * This is the portion of the real global
 * state which is available to applications
 */

import State from '../../../state/type/state';

// TODO Move
interface Rectange {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface GlobalState {
    files: State['files'];
    theme: State['theme'];
    backgroundImage: State['backgroundImage'];
    browserSize: State['browserSize'];
    windowPositions: Rectange[];
}

export default GlobalState;
