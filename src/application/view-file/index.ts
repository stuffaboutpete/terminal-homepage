import Application from '../../model/application/type/application';
import isFile from '../../model/file-system/is-file';

const viewFile: Application<{}, {}> = {
    name: 'view-file',
    aliases: ['vf', 'cat'],
    execute: async (args, { globalState }) => {
        let output: string[] = [];
        let error = false;

        const arg = args[0];

        if (args.length === 0) {
            output.push(
                'Please provide a file to view.',
                'To see the current directory run $HOTPINK$list-files$WHITE$.',
                '',
                'Example: $HOTPINK$view-file src/index.tsx'
            );
            error = true;
        }

        if (args.length > 1) {
            output.push(`$RED$Ignoring arguments: ${args.slice(1).join(', ')}$WHITE$`, '');
        }

        if (args.length >= 1) {
            const targetFile = (globalState.currentDirectory === '/')
                ? `/${arg}`
                : `${globalState.currentDirectory}/${arg}`;
            if (isFile(globalState.files)(targetFile)) {
                const response = await fetch(`${process.env.SOURCE_CODE_PREVIEW_URL}${targetFile}`);
                const fileContents = await response.text();
                output.push(fileContents);
            } else {
                output.push(`File does not exist: ${targetFile}`);
                error = true;

            }
        }

        return {
            output: output.join('\n'),
            error
        };
    }
};

export default viewFile;
