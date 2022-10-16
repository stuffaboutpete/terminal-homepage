import Application from '../../model/application/type/application';

const help: Application<{}, {}> = {
    name: 'help',
    execute: async () => {
        const startOutput = [
            '🙂 $BLUE$No problem...',
            '',
            '$DEFAULT$This website is a $YELLOW$terminal$DEFAULT$ which means you',
            'can run commands by typing them here and',
            'pressing $PURPLE$enter',
            '',
            '$DEFAULT$Here is a list of commands you can run:',
            '',
            ''
        ].join('\n');
        const commands = [
            ['help'],
            ['confetti'],
            ['fullscreen', 'fs'],
            ['set-background'],
            ['set-theme'],
            ['matrix'],
            ['files'],
            ['github', 'gh'],
            ['cv'],
            ['list-files', 'ls'],
            ['view-file', 'vf', 'cat'],
            ['change-directory', 'cd']
        ];
        const commandOutput = commands.reduce((out, next) => {
            const [command, ...aliases] = next;
            const aliasesOutput = aliases.map(alias => `$DEFAULT$or $YELLOW$${alias}`).join(' ');
            return out + `$YELLOW$${command}${aliases.length > 0 ? `$DEFAULT$ (${aliasesOutput}$DEFAULT$)` : ''}\n`;
        }, '');
        return {
            output: startOutput + commandOutput,
            error: false
        };
    }
};

export default help;
