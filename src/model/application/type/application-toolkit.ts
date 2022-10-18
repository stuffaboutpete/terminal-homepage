import GlobalState from './global-state';

interface ApplicationToolkit<ApplicationState extends {}, CanvasState extends {}> {
    globalState: GlobalState;
    applicationState: ApplicationState;
    openWindow: () => void;
    closeWindow: () => void;
    activateCanvas: () => void;
    deactivateCanvas: () => void;
    setState: (state: Partial<ApplicationState>) => void;
    setCanvasState: (state: Partial<CanvasState>) => void;
    executeCommand: (command: string) => void;
    changeDirectory: (directory: string) => void;
    setTheme: (theme: 'dark' | 'light' | 'auto') => void;
    setBackground: (background: number) => void;
    // setTitle: (title: string) => void;
    // setScroll: (position: 'top' | 'bottom') => void;
    // flip: () => void;
}

export default ApplicationToolkit;
