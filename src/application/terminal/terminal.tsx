import React from 'react';
import WindowToolkit from '../../model/application/type/window-toolkit';
import State from './state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './terminal.scss';

const Terminal = ({ globalState, applicationState, setState, messageApplication }: WindowToolkit<State>) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(
        () => inputRef.current?.focus(),
        [applicationState]
    );

    React.useLayoutEffect(
        () => {
            const scrollContainer = document.querySelector('.scrollable')
            if (scrollContainer) scrollContainer.scrollTop = 99999;
        },
        [applicationState.input, applicationState.history]
    );

    const commandHistory = applicationState.commandHistory;

    return (
        <div
            className={`terminal terminal--${globalState.theme}Theme`}
            onClick={() => inputRef.current?.focus()}
        >
            {commandHistory.length > 0 && (
                <div className="terminal-history">
                    {commandHistory.map((entry, index) => (
                        <div className="terminal-historyEntry" key={index}>
                            <div className="terminal-historyInput">
                                <FontAwesomeIcon icon={faChevronRight} />
                                <pre>{entry.input}</pre>
                            </div>
                            {entry.lastOutput && (
                                <pre>
                                    {entry.error && (
                                        <span className="terminal-historyError">Error:{' '}</span>
                                    )}
                                    {entry.lastOutput.split(/(?=\$[A-Z]+\$)/g).map((part, index) => {
                                        // TODO Too much logic
                                        const match = part.match(/\$([A-Z]+)\$((?:.|\n)+)/);
                                        return (match)
                                            ? <span key={index} className={`terminal-coloredText--${match[1].toLowerCase()}`}>{match[2]}</span>
                                            : <span key={index} className="terminal-coloredText--white">{part}</span>;
                                    })}
                                </pre>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {!applicationState.activeProcess && (
                <div className="terminal-input">
                    <FontAwesomeIcon icon={faChevronRight} />
                    <textarea
                        ref={inputRef}
                        value={applicationState.input}
                        placeholder={(() => {
                            if (applicationState.history.length === 0) return '';
                            if (!applicationState.history.includes('confetti')) return 'Try typing confetti';
                            if (!applicationState.history.includes('help')) return 'Type help to see all available commands';
                            return '';
                        })()}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        onInput={event => {
                            // document.querySelector('.scrollable').scrollTop = 99999;
                            setState({ input: event.currentTarget.value });
                        }}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                messageApplication({ command: applicationState.input });
                            }
                            if (event.key === 'ArrowUp') {
                                event.preventDefault();
                                if (applicationState.historyPointer > -1) {
                                    setState({
                                        input: applicationState.history[applicationState.historyPointer],
                                        historyPointer: applicationState.historyPointer - 1
                                    });
                                }
                            }
                            if (event.key === 'ArrowDown') {
                                event.preventDefault();
                                if (applicationState.history.length > applicationState.historyPointer + 2) {
                                    setState({
                                        input: applicationState.history[applicationState.historyPointer + 2],
                                        historyPointer: applicationState.historyPointer + 1
                                    });
                                }
                                if (applicationState.history.length === applicationState.historyPointer + 2) {
                                    setState({
                                        input: '',
                                        historyPointer: applicationState.historyPointer + 1
                                    });
                                }
                            }
                            if (event.key === 'Tab') {
                                event.preventDefault();
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Terminal;
