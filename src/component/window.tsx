import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Scrollable from './scrollable';
import './window.scss';

interface Props {
    theme: 'light' | 'dark' | 'auto';
    title?: string;
    children?: JSX.Element;
    onClose?: () => void;
    onHelp?: () => void;
}

const Window = (props: Props) => {
    return (
        <div className={`window window--${props.theme}`}>
            <div className="window-chrome">
                <div className="window-titleBar">
                    <span>{props.title}</span>
                    <div className="window-buttons">
                        {props.onClose && (
                            <div className="window-closeButton" onClick={() => props.onClose && props.onClose()}>
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </div>
                        )}
                        {props.onHelp && (
                            <div className="window-helpButton" onClick={() => props.onHelp && props.onHelp()}>
                                <FontAwesomeIcon icon={faQuestionCircle} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="window-content">
                    <Scrollable>
                        {props.children}
                    </Scrollable>
                </div>
            </div>
        </div>
    );
};

export default Window;
