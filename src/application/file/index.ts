import Application from '../../model/application/type/application';
import State from './state';
import Root from './root';
import isFile from '../../model/file-system/is-file';
import defaultState from './default-state';

const file: Application<State, {}> = {
    name: 'file',
    aliases: ['file'],
    defaultState,
    windowRenderer: Root,
    initialize: async (args, { globalState, setState, activateWindow, output, error, detach, onApplicationStateChange, setWindowTitle }) => {
        let outputStrings: string[] = [];

        if (args.length === 0) {
            error('Please provide a file to open');
            return;
        }

        if (args.length > 1) {
            outputStrings.push(`$BLUE$Ignoring arguments: $YELLOW$${args.slice(1).join('$DEFAULT$,$YELLOW$ ')}$DEFAULT$`, '');
        }

        const targetFile = args[0];

        if (args.length >= 1) {
            if (!isFile(globalState().files)(targetFile)) {
                outputStrings.push(`$RED$File does not exist: $YELLOW$${targetFile}`);
                error(outputStrings.join('\n'));
                return;
            } else {
                activateWindow();
                onApplicationStateChange(state => setWindowTitle(state.fileName || ''));
                setState({
                    fileName: targetFile,
                    fileContents: undefined
                });
                outputStrings.push(`$GREEN$Opening file: $YELLOW$${targetFile}`);
                const response = fetch(`${process.env.SOURCE_CODE_PREVIEW_URL}${targetFile}`);
                response.then(response => {
                    response.text().then(fileContents => {
                        setState({
                            fileName: targetFile,
                            fileContents
                        })
                    });
                });
            }
        }

        output(outputStrings.join('\n'));
        detach();
    }
};

export default file;
