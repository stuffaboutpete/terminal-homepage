import ProcessID from '../../model/application/type/process-id';
import GlobalState from '../../model/application/type/global-state';

export interface ActionPayloadMap {
    INIT: undefined;
    BROWSER_SIZE_CHANGE: {
        width: number;
        height: number;
    }
    WINDOW_TOUCH: {
        processId: ProcessID;
        position: {
            x: number;
            y: number;
        }
    };
    WINDOW_DRAG: {
        x: number;
        y: number;
    };
    WINDOW_TOUCH_END: undefined;
    EXECUTE_COMMAND: {
        newProcessId: ProcessID;
        command: string;
        ownerId: ProcessID;
    }
    ACTIVATE_WINDOW: {
        processId: ProcessID;
        title: string | undefined;
    };
    DEACTIVATE_WINDOW: ProcessID;
    ACTIVATE_CANVAS: ProcessID;
    DEACTIVATE_CANVAS: ProcessID;
    UPDATE_PROCESS_STATE: {
        processId: ProcessID;
        state: {};
    };
    UPDATE_CANVAS_STATE: {
        processId: ProcessID;
        state: {};
    }
    SET_THEME: 'light' | 'dark' | 'auto';
    SET_BACKGROUND: number;
    SEND_CLI_INPUT: {
        processId: ProcessID;
        input: string;
    };
    PROCESS_OUTPUT: {
        processId: ProcessID;
        output: string;
    }
    PROCESS_EXIT: ProcessID;
    PROCESS_ERROR: {
        processId: ProcessID;
        error: string;
    };
    PROCESS_DETACH: ProcessID;
    PROCESS_REMOVE: ProcessID;
    PROCESS_GUI_MESSAGE: {
        processId: ProcessID;
        message: unknown;
    };
    PROCESS_HELP_BUTTON: ProcessID;
    MESSAGE_CHILD_PROCESS: {
        childProcessId: ProcessID;
        message: string;
    }
    PROCESS_GLOBAL_STATE_CHANGE_CALLBACK_REGISTERED: {
        processId: ProcessID;
        callback: (state: GlobalState) => void;
    };
    PROCESS_APPLICATION_STATE_CHANGE_CALLBACK_REGISTERED: {
        processId: ProcessID;
        callback: (state: any) => void; // TODO any
    };
    PROCESS_GUI_MESSAGE_CALLBACK_REGISTERED: {
        processId: ProcessID;
        callback: (message: unknown) => void;
    };
    PROCESS_HELP_BUTTON_CALLBACK_REGISTERED: {
        processId: ProcessID;
        callback: () => void;
    };
    PROCESS_INPUT_CALLBACK_REGISTERED: {
        processId: ProcessID;
        callback: (input: string) => void;
    };
    CHILD_PROCESS_OUTPUT_CALLBACK_REGISTERED: {
        parentProcessId: ProcessID;
        callback: (childProcessId: ProcessID, output: string) => void;
    };
    CHILD_PROCESS_EXIT_CALLBACK_REGISTERED: {
        parentProcessId: ProcessID;
        callback: (childProcessId: ProcessID) => void;
    }
    CHILD_PROCESS_ERROR_CALLBACK_REGISTERED: {
        parentProcessId: ProcessID;
        callback: (childProcessId: ProcessID, error: string) => void;
    }
    CHILD_PROCESS_LAUNCH_ERROR_CALLBACK_REGISTERED: {
        parentProcessId: ProcessID;
        callback: (childProcessId: ProcessID) => void;
    }
    SET_WINDOW_TITLE: {
        processId: ProcessID;
        title: string;
    }
};

export type Payload<A extends Action> = ActionPayloadMap[A];

type Action = keyof ActionPayloadMap;

export default Action;
