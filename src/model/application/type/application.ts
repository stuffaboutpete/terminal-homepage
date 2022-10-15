import ApplicationName from './application-name';
import ApplicationToolkit from './application-toolkit';
import CanvasToolkit from './canvas-toolkit';

interface Application<ApplicationState extends {}, CanvasState extends {}> {
    name: ApplicationName;
    aliases?: string[];
    defaultState?: {};
    execute: (args: string[], toolkit: ApplicationToolkit<ApplicationState>) => Promise<{
        output: string;
        error: boolean;
    }>;
    autoComplete?: (args: string[]) => string;
    windowTitle?: string;
    renderWindow?: (toolkit: ApplicationToolkit<ApplicationState>) => JSX.Element;
    renderCanvas?: (toolkit: CanvasToolkit<CanvasState>) => CanvasState;
};

export default Application;
