import Application from '../../model/application/type/application';

const printWorkingDirectory: Application<{}, {}> = {
    name: 'print-working-directory',
    aliases: ['current-working-directory', 'pwd', 'cwd'],
    execute: async (args, { globalState }) => {
        return {
            output: `$BLUE$Working directory: $YELLOW$${globalState.currentDirectory}`,
            error: false
        };
    }
};

export default printWorkingDirectory;
