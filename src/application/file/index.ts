import Application from '../../model/application/type/application';
import State from './state';
import Root from './root';
import isFile from '../../model/file-system/is-file';
import defaultState from './default-state';

const file: Application<State, {}> = {
    name: 'file',
    aliases: ['file'],
    defaultState,
    execute: async (args, { globalState, setState, openWindow }) => {
        let output: string[] = [];
        let error = false;

        const targetFile = args[0];

        if (args.length === 0) {
            output.push('Please provide a file to open');
            error = true;
        }

        if (args.length > 1) {
            output.push(`$RED$Ignoring arguments: ${args.slice(1).join(', ')}$WHITE$`, '');
        }

        if (args.length >= 1) {
            if (!isFile(globalState.files)(targetFile)) {
                output.push(`File does not exist: ${targetFile}`);
                error = true;
            } else {
                setState({
                    fileName: targetFile,
                    fileContents: undefined
                });
                openWindow();
                output.push(`Opening file: ${targetFile}`);
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

        return {
            output: output.join('\n'),
            error
        };
    },
    renderWindow: Root,
    windowTitle: state => (state.fileName === undefined) ? '' : state.fileName
    
};

export default file;
