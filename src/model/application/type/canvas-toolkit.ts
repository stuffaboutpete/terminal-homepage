import GlobalState from './global-state';

interface CanvasToolkit<CanvasState extends {}> {
    globalState: GlobalState;
    canvasState: CanvasState;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    messageApplication: (message: unknown) => void;
    deactivateCanvas: () => void;
    exit: () => void;
}

export default CanvasToolkit;
