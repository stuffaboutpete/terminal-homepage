import Application from '../../model/application/type/application';

const colors: Application<{}, {}> = {
    name: 'colors',
    execute: async () => {
        return {
            output: [
                '$DEFAULT$Default',
                '$RED$Red',
                '$GREEN$Green',
                '$YELLOW$Yellow',
                '$BLUE$Blue',
                '$PURPLE$Purple',
                '$CYAN$Cyan'
            ].join('\n'),
            error: false
        }
    }
};

export default colors;
