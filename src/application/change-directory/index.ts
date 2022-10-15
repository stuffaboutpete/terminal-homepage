import Application from '../../model/application/type/application';
import isDirectory from '../../model/file-system/is-directory';

const changeDirectory: Application<{}, {}> = {
    name: 'change-directory',
    aliases: ['cd'],
    execute: async (args, { globalState, changeDirectory }) => {
        let output: string[] = [];
        let error = false;

        const arg = args[0];

        if (args.length === 0) {
            output.push(
                'Please provide a directory to change to.',
                'To see the current directory run $HOTPINK$list-files$WHITE$.',
                '',
                'Example: $HOTPINK$change-directory src'
            );
            error = true;
        }

        if (args.length > 1) {
            output.push(`$RED$Ignoring arguments: ${args.slice(1).join(', ')}$WHITE$`, '');
        }

        if (args.length >= 1) {
            let targetDirectory: string;
            if (arg === '..') {
                // TODO '..' should be functionality in model/file-system
                targetDirectory = `/${globalState.currentDirectory.split('/').slice(1, -1).join('/')}`;
            } else {
                if (globalState.currentDirectory === '/') {
                    targetDirectory = `/${arg}`
                } else {
                    targetDirectory = `${globalState.currentDirectory}/${arg}`;
                }

            }
            if (isDirectory(globalState.files)(targetDirectory)) {
                changeDirectory(targetDirectory);
                output.push(`Changing directory to $HOTPINK$${targetDirectory}`);
            } else {
                output.push(`Directory does not exist: ${targetDirectory}`);
                error = true;
            }
        }

        return {
            output: output.join('\n'),
            error
        };
    }
};

export default changeDirectory;
