import GlobalState from './global-state';
import ProcessID from './process-id';

interface WindowToolkit<ApplicationState extends {}> {
    globalState: GlobalState;
    applicationState: ApplicationState;
    setState: (arg: ((state: ApplicationState) => Partial<ApplicationState>) | (Partial<ApplicationState>)) => void;

    executeCommand: (command: string) => ProcessID;

    messageApplication: (message: unknown) => void;
    deactivateWindow: () => void;
    exit: () => void;
}

export default WindowToolkit;
