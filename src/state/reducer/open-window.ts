import actionReducer from '../action-reducer';

export default actionReducer('OPEN_WINDOW', (state, payload) => {
    const application = state.applicationInstances[payload];

    // TODO These belongs in model somewhere...

    const windows = Object.values(state.applicationInstances)
        .map(application => application.window)
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

    if (!application.window) {
        const width = Math.min(state.browserSize.width - 200, 900);
        const height = Math.min(state.browserSize.height - 200, 700);
        let x = (state.browserSize.width - width) / 2;
        let y = (state.browserSize.height - height) / 2;

        if (topWindow && x === topWindow.x && y === topWindow.y) {
            x += 40;
            y += 40;
        }

        application.window = {
            x,
            y,
            width,
            height,
            zIndex: 0
        };
    }

    application.window.zIndex = highestZIndex + 1;
});
