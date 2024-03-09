import Application from '../../model/application/type/application';

const intro: Application<{}, {}> = {
    name: 'intro',
    initialize: async (args, { output, detach }) => {
        output([
            '$BLUE$Welcome to the homepage of $YELLOW$Pete Smith.',
            '',
            '$DEFAULT$More words and stuff',
        ].join('\n'));

        detach();
    }
};

export default intro;
