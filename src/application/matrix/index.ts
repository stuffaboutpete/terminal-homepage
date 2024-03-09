import Application from '../../model/application/type/application';
import Root from './root';

const matrix: Application<{}, {}> = {
    name: 'matrix',
    windowRenderer: Root,
    initialize: async (args, { activateWindow, output, detach }) => {
        output('$GREEN$You chose the $RED$red$GREEN$ pill.');
        activateWindow('Matrix');
        detach();
    }
};

export default matrix;
