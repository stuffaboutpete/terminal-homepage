export interface ActionPayloadMap {
    INIT: undefined;
    BROWSER_SIZE_CHANGE: {
        width: number;
        height: number;
    }
    WINDOW_TOUCH: {
        applicationName: string;
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
    EXECUTE_COMMAND: string;
    COMMAND_EXECUTION_COMPLETE: {
        output: string;
        error: boolean;
    };
    OPEN_WINDOW: string;
    CLOSE_WINDOW: string;
    ACTIVATE_CANVAS: string;
    DEACTIVATE_CANVAS: string;
    UPDATE_APPLICATION_STATE: {
        applicationName: string;
        state: {};
    };
    CHANGE_DIRECTORY: string;
    SET_THEME: 'light' | 'dark' | 'auto';
    SET_BACKGROUND: number;
};

export type Payload<A extends Action> = ActionPayloadMap[A];

type Action = keyof ActionPayloadMap;

export default Action;
