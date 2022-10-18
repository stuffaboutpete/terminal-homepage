import ApplicationName from './application-name';
import ApplicationToolkit from './application-toolkit';
import CanvasToolkit from './canvas-toolkit';

interface Application<ApplicationState extends {}, CanvasState extends {}> {
    name: ApplicationName;
    aliases?: string[];
    defaultState?: ApplicationState;
    defaultCanvasState?: CanvasState;
    execute: (args: string[], toolkit: ApplicationToolkit<ApplicationState, CanvasState>) => Promise<{
        output: string;
        error: boolean;
    }>;
    autoComplete?: (args: string[]) => string;
    windowTitle?: (applicationState: ApplicationState) => string;
    renderWindow?: (toolkit: ApplicationToolkit<ApplicationState, CanvasState>) => JSX.Element;
    renderCanvas?: (toolkit: CanvasToolkit<CanvasState>) => CanvasState;
    onHelpButton?: (toolkit: ApplicationToolkit<ApplicationState, CanvasState>) => void;
};

export default Application;
