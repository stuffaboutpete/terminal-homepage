import Process from './type/process';
import ProcessLaunchFailure from './type/process-launch-failure';

type T = (process: Process | ProcessLaunchFailure) => process is Process;

const f: T = (process): process is Process => {
    return (process as ProcessLaunchFailure).failure === undefined ? true : false;
};

export default f;
