import ProcessID from '../../model/application/type/process-id';

interface State {
    input: string;
    history: string[];
    historyPointer: number;
    currentDirectory: string;
    activeProcess: boolean;
    commandHistory: Array<{
        processId: ProcessID;
        input: string;
        lastOutput?: string;
        error?: boolean;
    }>;
};

export default State;
