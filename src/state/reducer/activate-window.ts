import actionReducer from '../action-reducer';
import isProcess from '../../model/application/is-process';
import Process from '../../model/application/type/process';

export default actionReducer('ACTIVATE_WINDOW', (state, payload) => {
    const { processId, title } = payload;
    const process = state.processes[processId] as Process;

    // TODO These belongs in model somewhere...

    const windows = Object.values(state.processes)
        .filter(isProcess)
        .map(process => process.window)
        .filter(window => window !== undefined);

    const highestZIndex = Math.max(0, ...windows.map(window => {
        if (!window) throw new Error('Unexpected error');
        return window.zIndex;
    }));

    const topWindow = windows
        .filter(window => {
            if (!window) throw new Error('Unexpected error');
            return window.zIndex === highestZIndex;
        })
        .pop();

    if (!process.window) {
        const widthMargin = state.browserSize.width / 5;
        const heightMargin = state.browserSize.height / 5;
        const width = Math.min(state.browserSize.width - widthMargin, 920);
        const height = Math.min(state.browserSize.height - heightMargin, 700);
        let x = (state.browserSize.width - width) / 2;
        let y = (state.browserSize.height - height) / 2;

        if (topWindow && x === topWindow.x && y === topWindow.y) {
            x += 40;
            y += 40;
        }

        process.window = {
            x,
            y,
            width,
            height,
            zIndex: 0
        };

    }

    process.window.zIndex = highestZIndex + 1;

    if (title) process.window.title = title;
});
