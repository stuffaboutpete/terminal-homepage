import Application from '../../model/application/type/application';

const intro: Application<{}, {}> = {
    name: 'intro',
    execute: async (args, toolkit) => {
        return {
            output: [
                '$BLUE$Welcome to the homepage of $YELLOW$Pete Smith.',
                '',
                '$DEFAULT$More words and stuff',
            ].join('\n'),
            error: false
        };
    }
};

export default intro;
