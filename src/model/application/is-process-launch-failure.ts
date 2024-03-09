import Process from './type/process';
import ProcessLaunchFailure from './type/process-launch-failure';

type T = (process: Process | ProcessLaunchFailure) => process is ProcessLaunchFailure;

const f: T = (process): process is ProcessLaunchFailure => {
    return (process as ProcessLaunchFailure).failure === undefined ? false : true;
};

export default f;
