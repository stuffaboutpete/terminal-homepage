import ApplicationName from './application-name';
import ApplicationToolkit from './application-toolkit';
import WindowToolkit from './window-toolkit';
import CanvasToolkit from './canvas-toolkit';

interface Application<ApplicationState extends {}, CanvasState extends {}> {
    name: ApplicationName;
    aliases?: string[];
    defaultState?: ApplicationState;
    defaultCanvasState?: CanvasState;
    initialize: (args: string[], toolkit: ApplicationToolkit<ApplicationState, CanvasState>) => void;
    autoComplete?: (args: string[]) => string;
    windowRenderer?: (toolkit: WindowToolkit<ApplicationState>) => JSX.Element;
    canvasRenderer?: (toolkit: CanvasToolkit<CanvasState>) => CanvasState;
};

export default Application;
