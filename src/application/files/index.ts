import Application from '../../model/application/type/application';
import State from './state';
import Root from './root';
import isDirectory from '../../model/file-system/is-directory';
import defaultState from './default-state';

const files: Application<State, {}> = {
    name: 'files',
    defaultState: defaultState,
    windowRenderer: Root,
    initialize: async (args, { output, error, detach, activateWindow, setState, globalState, onApplicationStateChange, setWindowTitle }) => {
        if (args.length === 0) {
            error('Please provide a directory');
            return;
        }

        if (args.length > 1) {
            error('Please provide a single directory');
            return;
        }

        const targetDirectory = args[0];

        if (!isDirectory(globalState().files)(targetDirectory)) {
            // TODO More helpful error
            error('Please provide a valid directory');
            return;
        }

        activateWindow('Files');
        onApplicationStateChange(state => setWindowTitle(`Files${'\u00A0'}${'\u00A0'}-${'\u00A0'}${'\u00A0'}${state.currentDirectory}`));
        setState({ currentDirectory: targetDirectory });

        output(`$GREEN$Opening files $DEFAULT$at directory: $YELLOW$${targetDirectory}`);
        detach();
    }
};

export default files;
