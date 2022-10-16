import Application from '../../model/application/type/application';
import State from './state';
import Root from './root';
import isDirectory from '../../model/file-system/is-directory';
import defaultState from './default-state';

const files: Application<State, {}> = {
    name: 'files',
    defaultState: defaultState,
    execute: async (args, { openWindow, setState, globalState }) => {
        let targetDirectory = globalState.currentDirectory;

        if (args.length > 0) {
            if (isDirectory(globalState.files)(args[0])) {
                targetDirectory = args[0];
            }
        }

        setState({ currentDirectory: targetDirectory });
        openWindow();

        return {
            output: 'Opening...',
            error: false
        };
    },
    renderWindow: Root,
    windowTitle: () => 'Files'
};

export default files;
