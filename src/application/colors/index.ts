import Application from '../../model/application/type/application';

const colors: Application<{}, {}> = {
    name: 'colors',
    initialize: async (args, { output, exit }) => {
        output([
            '$DEFAULT$Default',
            '$RED$Red',
            '$GREEN$Green',
            '$YELLOW$Yellow',
            '$BLUE$Blue',
            '$PURPLE$Purple',
            '$CYAN$Cyan'
        ].join('\n'));
        exit();
    }
};

export default colors;
