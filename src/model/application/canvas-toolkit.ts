import State from '../../state/type/state';
import CanvasToolkit from './type/canvas-toolkit';
import globalState from './global-state';

type T = <CanvasState extends {}>(
    globalState: State,
    canvasState: CanvasState,
    canvas: HTMLCanvasElement
) => CanvasToolkit<CanvasState>;

const f: T = (state, canvasState, canvas) => ({
    globalState: globalState(state),
    canvasState,
    canvas,
    context: canvas.getContext('2d') as CanvasRenderingContext2D
});

export default f;
