import ProcessID from './process-id';
import ApplicationName from './application-name';
import Window from '../../window/type/window';

interface Process {
    ownerId: ProcessID;
    name: ApplicationName;
    state: {};
    detached: boolean;
    window?: Window;
    canvasActive: boolean;
};

export default Process;
