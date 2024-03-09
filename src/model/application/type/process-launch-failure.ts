import ProcessID from './process-id';

interface ProcessLaunchFailure {
    ownerId: ProcessID;
    command: string;
    failure: 'unknown-application'
};

export default ProcessLaunchFailure;
