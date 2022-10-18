import GlobalState from './global-state';

interface CanvasToolkit<CanvasState extends {}> {
    globalState: GlobalState;
    canvasState: CanvasState;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    deactivateCanvas: () => void;
}

export default CanvasToolkit;
