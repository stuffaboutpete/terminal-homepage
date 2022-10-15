import Application from '../../model/application/type/application';

const help: Application<{}, {}> = {
    name: 'help',
    execute: async () => {
        const startOutput = [
            '🙂 No problem...',
            '',
            'This website is a terminal which means you',
            'can run commands by typing them here and',
            'pressing enter',
            '',
            'Here is a list of commands you can run:',
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
            const aliasesOutput = aliases.map(alias => `$CADETBLUE$or $DARKTURQUOISE$${alias}`).join(' ');
            return out + `$DARKTURQUOISE$${command}${aliases.length > 0 ? `$CADETBLUE$ (${aliasesOutput}$CADETBLUE$)` : ''}\n`;
        }, '');
        return {
            output: startOutput + commandOutput,
            error: false
        };
    }
};

export default help;
