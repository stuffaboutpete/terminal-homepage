import Subscriber from '../type/subscriber';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: {
            connect: () => {
                send: (...args: any[]) => void;
                subscribe: (callback: (message) => void) => void;
            };
        }
    }
}

let devTools;
if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
    devTools.send('@@INIT');
}

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (devTools) devTools.send({ type: action, payload }, state);
};

export default f;
