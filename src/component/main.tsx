import React, { Fragment } from 'react';
import State from '../state/type/state';
import Dispatch from '../state/type/dispatch';
import Window from './window';
import applications from '../application';
import fromList from '../model/application/from-list';
import applicationToolkit from '../model/application/application-toolkit';
import './main.scss';

interface Props {
    state: State;
    dispatch: Dispatch;
}

const Main = ({ state, dispatch }: Props) => (
    <main
        className="main"
        onMouseMove={event => {
            if (!state.windowDrag) return;
            dispatch('WINDOW_DRAG', {
                x: event.clientX,
                y: event.clientY
            });
        }}
        onMouseUp={() => {
            if (!state.windowDrag) return;
            dispatch('WINDOW_TOUCH_END', undefined)
        }}
    >
        {Object.keys(state.applicationInstances).map(applicationName => {
            const instance = state.applicationInstances[applicationName];
            const window = instance.window;
            const canvas = instance.canvasActive;

            const application = fromList(applications, applicationName);
            if (application === undefined) return;

            const toolkit = applicationToolkit(state, dispatch, applicationName);
            const WindowContent = application.renderWindow;

            return (
                <Fragment key={applicationName}>
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
                                applicationName,
                                position: {
                                    x: event.clientX,
                                    y: event.clientY
                                }
                            })}
                        >
                            <Window
                                title={application.windowTitle ? application.windowTitle(instance.state) : applicationName}
                                theme={state.theme}
                                onClose={applicationName !== 'terminal' ? () => dispatch('CLOSE_WINDOW', applicationName) : undefined}
                                onHelp={application.onHelpButton ? () => application.onHelpButton(toolkit) : undefined}
                            >
                                <WindowContent {...toolkit} />
                            </Window>
                        </div>
                    )}
                    {canvas && (
                        <canvas id={applicationName}></canvas>
                    )}
                </Fragment>
            );
        })}
    </main>
);

export default Main;
