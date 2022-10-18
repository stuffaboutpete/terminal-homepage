import Application from '../../model/application/type/application';
import State from './type/state';
import defaultState from './default-state';
import render from './render';

const confetti: Application<{}, State> = {
    name: 'confetti',
    defaultCanvasState: defaultState,
    execute: async (args, { activateCanvas, setCanvasState }) => {
        activateCanvas();
        setCanvasState({ futureParticleCount: 30 })
        return {
            output: '🎉 $PURPLE$Enjoy!',
            error: false
        };
    },
    renderCanvas: render
};

export default confetti;
