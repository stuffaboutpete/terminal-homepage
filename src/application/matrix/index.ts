import Application from '../../model/application/type/application';
import Root from './root';

const matrix: Application<{}, {}> = {
    name: 'matrix',
    execute: async (args, { openWindow }) => {
        openWindow();
        return {
            output: '$GREEN$You chose the $RED$red$GREEN$ pill.',
            error: false
        };
    },
    renderWindow: Root,
    windowTitle: () => 'Matrix'
};

export default matrix;
