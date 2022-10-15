import Application from '../../model/application/type/application';
import State from './state';
import Terminal from './terminal';
import defaultState from './default-state';

const terminal: Application<State, {}> = {
    name: 'terminal',
    defaultState,
    execute: async (args, { openWindow, setState, executeCommand }) => {
        openWindow();
        setTimeout(() => setState({ input: 'i' }), 1500);
        setTimeout(() => setState({ input: 'in' }), 1600);
        setTimeout(() => setState({ input: 'int' }), 1700);
        setTimeout(() => setState({ input: 'intr' }), 1800);
        setTimeout(() => setState({ input: 'intro' }), 1900);
        setTimeout(() => {
            executeCommand('intro');
            setState({
                input: '',
                history: ['intro'],
                historyPointer: 0
            });
        }, 2300);
        return {
            output: 'Terminal opening...',
            error: false
        };
    },
    renderWindow: Terminal,
    windowTitle: 'Terminal'
};

export default terminal;
