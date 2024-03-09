import Application from '../../model/application/type/application';
import append from 'common/src/string/append';
import filesInDirectory from '../../model/file-system/files-in-directory';
import directoriesInDirectory from '../../model/file-system/directories-in-directory';

const listFiles: Application<{}, {}> = {
    name: 'list-files',
    aliases: ['ls', 'll'],
    initialize: async (args, { globalState }) => {
        const directories = directoriesInDirectory(globalState.files)(globalState.currentDirectory);
        const files = filesInDirectory(globalState.files)(globalState.currentDirectory);
        return {
            output: [
                `Directory: $BLUE$${globalState.currentDirectory}`,
                '$YELLOW$',
                ...directories.map(append('/')),
                ...files
            ].join('\n'),
            error: false
        };
    }
};

export default listFiles;
