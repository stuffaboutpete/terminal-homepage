import ProcessID from '../../model/application/type/process-id';
import Process from '../../model/application/type/process';
import ProcessLaunchFailure from '../../model/application/type/process-launch-failure';
import GlobalState from '../../model/application/type/global-state';
import FileSystem from '../../model/file-system/type/file-system';

interface State {
    windowDrag?: {
        processId: ProcessID;
        lastLocation: {
            x: number;
            y: number;
        };
    };
    files: FileSystem;
    theme: 'light' | 'dark' | 'auto';
    backgroundImage: number;
    fullScreen: boolean;
    browserSize: {
        width: number;
        height: number;
    };
    processes: Record<ProcessID, Process | ProcessLaunchFailure>;
    callbacks: Array<{
        event: 'processInput';
        processId: ProcessID;
        callback: (input: string) => void;
    } | {
        event: 'processGlobalStateChange';
        processId: ProcessID;
        callback: (state: GlobalState) => void;
    } | {
        event: 'processApplicationStateChange';
        processId: ProcessID;
        callback: (state: any) => void;
    } | {
        event: 'processGuiMessage';
        processId: ProcessID;
        callback: (message: unknown) => void;
    } | {
        event: 'processHelpButton';
        processId: ProcessID;
        callback: () => void;
    } | {
        event: 'childProcessOutput';
        parentProcessId: ProcessID;
        callback: (childProcessId: ProcessID, output: string) => void;
    } | {
        event: 'childProcessLaunchError';
        parentProcessId: ProcessID;
        callback: (childProcessId: ProcessID) => void;
    } | {
        event: 'childProcessError';
        parentProcessId: ProcessID;
        callback: (childProcessId: ProcessID, error: string) => void;
    } | {
        event: 'childProcessExit';
        parentProcessId: ProcessID;
        callback: (childProcessId: ProcessID) => void;
    }>
};

export default State;
