import Subscriber from '../type/subscriber';
import Payload from '../type/payload';
import applications from '../../application';
import fromList from '../../model/application/from-list';
import applicationToolkit from '../../model/application/application-toolkit';

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'EXECUTE_COMMAND') return;
    if (payload === 'clear' || payload === 'c') return; // TODO This smells

    const command = payload as Payload<'EXECUTE_COMMAND'>;
    const [applicationName, ...args] = command.split(/\s/g);
    const application = fromList(applications, applicationName);

    if (application) {
        const promise = application.execute(
            args,
            applicationToolkit(state, dispatch, applicationName)
        );

        promise.then(output => {
            dispatch('COMMAND_EXECUTION_COMPLETE', output);
        });
    }

    if (!application) {
        dispatch('COMMAND_EXECUTION_COMPLETE', {
            output: [
                `Unrecognised command: $PURPLE$${payload}`,
                '',
                '$DEFAULT$You can run $YELLOW$help$DEFAULT$ to see a list',
                'of available commands.'
            ].join('\n'),
            error: true
        });
    }
};

export default f;
