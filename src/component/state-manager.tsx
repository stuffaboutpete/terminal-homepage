import * as React from 'react';
import produce from 'immer';
import State from '../state/type/state';
import Action from '../state/type/action';
import Payload from '../state/type/payload';
import ProcessID from '../model/application/type/process-id';
import isProcessLaunchFailure from '../model/application/is-process-launch-failure';
import reducers from '../state/reducer';
import providers from '../state/provider';
import subscribers from '../state/subscriber';
import defaultState from '../state/default';
import Main from './main';
import applications from '../application';
import fromList from '../model/application/from-list';
import canvasToolkit from '../model/application/canvas-toolkit';

class StateManager extends React.Component<{}, State> {
    private canvases: Record<ProcessID, HTMLCanvasElement> = {};
    private canvasStates: Record<ProcessID, {}> = {};

    public constructor(props: {}) {
        super(props);
        this.state = defaultState;
    }

    public render(): JSX.Element {
        return (
            <Main
                state={this.state}
                dispatch={this.dispatch.bind(this)}
                getState={this.getState.bind(this)}
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

    private getState(): State {
        return this.state;
    }

    private dispatch<A extends Action>(action: A, payload: Payload<A>): void {
        if (action === 'ACTIVATE_CANVAS' || action === 'DEACTIVATE_CANVAS' || action === 'UPDATE_CANVAS_STATE') {
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
            this.dispatch.bind(this),
            this.getState.bind(this)
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
            const processId = payload as Payload<'ACTIVATE_CANVAS'>;
            const process = this.state.processes[processId];

            if (!process) throw new Error(`Unexpected error: No process exists with ID ${processId}`);
            if (isProcessLaunchFailure(process)) return;

            // TODO Isn't this a job for a regular reducer??
            if (!this.canvasStates[processId]) {
                const application = fromList(applications, process.name)!;
                this.canvasStates[processId] = application.defaultCanvasState || {};
            }
        }

        if (action === 'DEACTIVATE_CANVAS') {
            const processId = payload as Payload<'DEACTIVATE_CANVAS'>;
            delete this.canvases[processId];
        }

        if (action === 'UPDATE_CANVAS_STATE') {
            const { processId, state } = payload as Payload<'UPDATE_CANVAS_STATE'>;
            this.canvasStates[processId] = {
                ...this.canvasStates[processId],
                ...state
            };
        }
    }

    // TODO Finish thinking this through
    private renderCanvases(): void {
        Object.keys(this.state.processes).forEach(processId => {
            const process = this.state.processes[processId];
            if (isProcessLaunchFailure(process)) return;
            if (!process.canvasActive) return;

            const application = fromList(applications, process.name);
            if (!application || !application.canvasRenderer) return;

            const canvas = this.getCanvas(processId);

            const newState = application.canvasRenderer(canvasToolkit(
                this.state,
                this.canvasStates[processId],
                canvas as HTMLCanvasElement,
                () => this.dispatch('DEACTIVATE_CANVAS', processId) // TODO This doesn't need passing - pass dispatch like the other toolkits
            ));

            this.canvasStates[processId] = newState;
        });
        requestAnimationFrame(this.renderCanvases.bind(this));
    }

    private getCanvas(processId: ProcessID): HTMLCanvasElement {
        if (!this.canvases[processId]) {
            this.canvases[processId] = document.querySelector(`canvas#a${processId}`)!;
        }
        return this.canvases[processId];
    }
}

export default StateManager;
