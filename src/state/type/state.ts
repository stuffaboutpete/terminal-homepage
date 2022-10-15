import ApplicationName from '../../model/application/type/application-name';
import Window from '../../model/window/type/window';
import FileSystem from '../../model/file-system/type/file-system';

interface State {
    windowDrag?: {
        applicationName: string;
        lastLocation: {
            x: number;
            y: number;
        };
    };
    files: FileSystem;
    currentDirectory: string;
    theme: 'light' | 'dark' | 'auto';
    backgroundImage: number;
    fullScreen: boolean;
    browserSize: {
        width: number;
        height: number;
    }
    isProcessingCommand: boolean;
    commandHistory: Array<{
        input: string;
        output?: string;
        error?: boolean;
    }>;
    applicationInstances: Record<ApplicationName, {
        state: {},
        window?: Window,
        canvasActive?: boolean;
    }>;
};

export default State;
