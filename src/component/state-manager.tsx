import * as React from 'react';
import produce from 'immer';
import State from '../state/type/state';
import Action from '../state/type/action';
import Payload from '../state/type/payload';
import ApplicationName from '../model/application/type/application-name';
import reducers from '../state/reducer';
import providers from '../state/provider';
import subscribers from '../state/subscriber';
import defaultState from '../state/default';
import Main from './main';
import applications from '../application';
import fromList from '../model/application/from-list';
import canvasToolkit from '../model/application/canvas-toolkit';

class StateManager extends React.Component<{}, State> {
    private canvasStates: Record<ApplicationName, {}> = {};

    public constructor(props: {}) {
        super(props);
        this.state = defaultState;
    }

    public render(): JSX.Element {
        return (
            <Main
                state={this.state}
                dispatch={this.dispatch.bind(this)}
            />
        );
    }

    public componentDidMount(): void {
        setTimeout(() => {
            providers.forEach(provider => provider(this.dispatch.bind(this)));
            this.dispatch('INIT', undefined);
        }, 0);

        requestAnimationFrame(this.renderCanvases.bind(this));
    }

    private dispatch<A extends Action>(action: A, payload: Payload<A>): void {
        if (action === 'ACTIVATE_CANVAS' || action === 'UPDATE_CANVAS_STATE') {
            this.handleCanvasAction(action, payload);
        }

        const previousState = this.state;
        const newState = this.reduce(this.state, action, payload);

        this.state = newState;
        this.setState(newState);

        subscribers.forEach(subscriber => subscriber(
            action,
            payload,
            newState,
            previousState,
            this.dispatch.bind(this)
        ));
    }

    private reduce<A extends Action>(state: State, action: Action, payload: Payload<A>): State {
        return reducers.reduce((newState, nextReducer) => produce(
            newState,
            draftState => nextReducer(draftState, action, payload)
        ), state);
    }

    private handleCanvasAction<A extends Action>(action: A, payload: Payload<A>): void {
        if (action === 'ACTIVATE_CANVAS') {
            const applicationName = payload as Payload<'ACTIVATE_CANVAS'>;
            if (!this.canvasStates[applicationName]) {
                this.canvasStates[applicationName] = fromList(applications, applicationName).defaultCanvasState;
            }
            this.canvasStates
        }

        if (action === 'UPDATE_CANVAS_STATE') {
            const { applicationName, state } = payload as Payload<'UPDATE_CANVAS_STATE'>;
            this.canvasStates[applicationName] = {
                ...this.canvasStates[applicationName],
                ...state
            };
        }
    }

    // TODO Finish thinking this through
    private renderCanvases(): void {
        Object.keys(this.state.applicationInstances).forEach(applicationName => {
            const instance = this.state.applicationInstances[applicationName];
            if (!instance.canvasActive) return;

            const application = fromList(applications, applicationName);
            if (!application || !application.renderCanvas) return;

            // TODO Cache these
            const canvas = document.querySelector(`canvas#${applicationName}`);

            const newState = application.renderCanvas(canvasToolkit(
                this.state,
                this.canvasStates[applicationName],
                canvas as HTMLCanvasElement,
                () => this.dispatch('DEACTIVATE_CANVAS', applicationName)
            ));

            this.canvasStates[applicationName] = newState;
        });
        requestAnimationFrame(this.renderCanvases.bind(this));
    }
}

export default StateManager;
