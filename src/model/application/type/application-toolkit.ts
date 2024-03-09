import GlobalState from './global-state';
import ProcessID from './process-id';

interface ApplicationToolkit<ApplicationState extends {}, CanvasState extends {}> {
    globalState: () => GlobalState;
    applicationState: () => ApplicationState;
    setState: (arg: ((state: ApplicationState) => Partial<ApplicationState>) | (Partial<ApplicationState>)) => void;
    setCanvasState: (state: Partial<CanvasState>) => void;
    onGlobalStateChange: (callback: (state: GlobalState) => void) => void;
    onApplicationStateChange: (callback: (state: ApplicationState) => void) => void;

    onInput: (callback: (input: string) => void) => void;
    output: (text: string) => void;
    error: (error: string) => void;
    detach: () => void;
    exit: () => void;
    messageChildProcess: (processId: ProcessID, message: string) => void;

    activateWindow: (title?: string) => void;
    deactivateWindow: () => void;
    activateCanvas: () => void;
    deactivateCanvas: () => void;
    setWindowTitle: (title: string) => void;
    onGuiMessage: (callback: (message: unknown) => void) => void;
    onHelpButton: (callback: () => void) => void;

    executeCommand: (command: string) => ProcessID;

    onChildProcessOutput: (callback: (processId: ProcessID, output: string) => void) => void;
    onChildProcessExit: (callback: (processId: ProcessID) => void) => void;
    onChildProcessError: (callback: (processId: ProcessID, error: string) => void) => void;
    onChildProcessLaunchError: (callback: (processId: ProcessID) => void) => void;

    setTheme: (theme: 'dark' | 'light' | 'auto') => void;
    setBackground: (background: number) => void;
    flipWindow: () => void;
}

export default ApplicationToolkit;
