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
                '$BLUE$Please provide a file to view.',
                '',
                '$DEFAULT$To see the current directory run $YELLOW$list-files$DEFAULT$.',
                '',
                'Example: $CYAN$view-file src/index.tsx'
            );
            error = true;
        }

        if (args.length > 1) {
            output.push(`$RED$Ignoring arguments: $YELLOW$${args.slice(1).join('$DEFAULT$,$YELLOW$ ')}$DEFAULT$`, '');
        }

        if (args.length >= 1) {
            const targetFile = (globalState.currentDirectory === '/')
                ? `/${arg}`
                : `${globalState.currentDirectory}/${arg}`;
            if (isFile(globalState.files)(targetFile)) {
                const response = await fetch(`${process.env.SOURCE_CODE_PREVIEW_URL}${targetFile}`);
                const fileContents = await response.text();
                output.push(
                    `$GREEN$Showing contents of: $YELLOW$${targetFile}`,
                    '',
                    `$BLUE$${fileContents}`
                );
            } else {
                output.push(`$BLUE$File does not exist: $PURPLE$${targetFile}`);
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
