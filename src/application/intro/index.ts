import Application from '../../model/application/type/application';

const intro: Application<{}, {}> = {
    name: 'intro',
    execute: async (args, toolkit) => {
        return {
            output: [
                'Welcome to the homepage of Pete Smith.',
                'More words and stuff',
            ].join('\n'),
            error: false
        };
    }
};

export default intro;
