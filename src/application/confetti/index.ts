import Application from '../../model/application/type/application';
import State from './type/state';
import defaultState from './default-state';
import render from './render';

const confetti: Application<{}, State> = {
    name: 'confetti',
    defaultCanvasState: defaultState,
    canvasRenderer: render,
    initialize: async (args, { activateCanvas, setCanvasState, output, detach }) => {
        activateCanvas();
        setCanvasState({ futureParticleCount: 30 })
        output('🎉 $PURPLE$Enjoy!');
        detach();
    }
};

export default confetti;
