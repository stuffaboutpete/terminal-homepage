import React, { Fragment } from 'react';
import State from '../state/type/state';
import Dispatch from '../state/type/dispatch';
import Window from './window';
import applications from '../application';
import fromList from '../model/application/from-list';
import windowToolkit from '../model/application/window-toolkit';
import isProcessLaunchFailure from '../model/application/is-process-launch-failure';
import './main.scss';

interface Props {
    state: State;
    getState: () => State;
    dispatch: Dispatch;
}

// TODO Only do getState once
const Main = ({ getState, dispatch }: Props) => (
    <main
        className="main"
        onMouseMove={event => {
            if (!getState().windowDrag) return;
            dispatch('WINDOW_DRAG', {
                x: event.clientX,
                y: event.clientY
            });
        }}
        onMouseUp={() => {
            if (!getState().windowDrag) return;
            dispatch('WINDOW_TOUCH_END', undefined)
        }}
    >
        {Object.keys(getState().processes).map(processId => {
            const process = getState().processes[processId];

            if (isProcessLaunchFailure(process)) return;

            const window = process.window;
            const canvas = process.canvasActive;

            const application = fromList(applications, process.name)!;

            const toolkit = windowToolkit(getState, dispatch, processId);
            const WindowContent = application.windowRenderer;

            const helpButtonCallback = getState().callbacks.find(callback => {
                if (callback.event !== 'processHelpButton') return false;
                return (callback.processId === processId) ? true : false;
            });

            // TODO Why don't we just bail early if there's no window?
            return (
                <Fragment key={processId}>
                    {window && WindowContent && (
                        <div
                            className="main-translationWrapper"
                            style={{
                                translate: `${window.x}px ${window.y}px`,
                                width: window.width,
                                height: window.height,
                                zIndex: window.zIndex
                            }}
                            onMouseDown={event => dispatch('WINDOW_TOUCH', {
                                processId,
                                position: {
                                    x: event.clientX,
                                    y: event.clientY
                                }
                            })}
                        >
                            <Window
                                title={window.title}
                                theme={getState().theme}
                                onClose={processId !== '1' ? () => dispatch('DEACTIVATE_WINDOW', processId) : undefined}
                                onHelp={helpButtonCallback ? () => dispatch('PROCESS_HELP_BUTTON', processId) : undefined}
                            >
                                <WindowContent {...toolkit} />
                            </Window>
                        </div>
                    )}
                    {canvas && (
                        <canvas id={`a${processId}`}></canvas>
                    )}
                </Fragment>
            );
        })}
    </main>
);

export default Main;
