import React from 'react';
import ApplicationToolkit from '../../model/application/type/application-toolkit';
import State from './state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './terminal.scss';

const Terminal = ({ globalState, applicationState, setState, executeCommand }: ApplicationToolkit<State>) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(
        () => inputRef.current?.focus(),
        [globalState.isProcessingCommand]
    );

    // React.useLayoutEffect(
    //     () => { document.querySelector('.scrollable').scrollTop = 99999 },
    //     [props.input, props.history, props.isProcessingInput]
    // );

    const commandHistory = globalState.commandHistory.filter(historyEntry => historyEntry.input !== 'terminal');

    return (
        <div className="terminal" onClick={() => inputRef.current?.focus()}>
            {commandHistory.length > 0 && (
                <div className="terminal-history">
                    {commandHistory.map((entry, index) => (
                        <div className="terminal-historyEntry" key={index}>
                            <div className="terminal-historyInput">
                                <FontAwesomeIcon icon={faChevronRight} />
                                <pre>{entry.input}</pre>
                            </div>
                            {entry.output && (
                                <pre>
                                    {entry.error && (
                                        <span className="terminal-historyError">Error:{' '}</span>
                                    )}
                                    {entry.output.split(/(?=\$[A-Z]+\$)/g).map((part, index) => {
                                        // TODO Too much logic
                                        const match = part.match(/\$([A-Z]+)\$((?:.|\n)+)/);
                                        return (match)
                                            ? <span key={index} style={{ color: match[1] }}>{match[2]}</span>
                                            : part;
                                    })}
                                </pre>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {globalState.isProcessingCommand && (
                <div className="terminal-processing">
                    <pre>Processing...</pre>
                </div>
            )}
            {!globalState.isProcessingCommand && (
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
                                executeCommand(applicationState.input);
                                setState({
                                    input: '',
                                    history: [
                                        ...applicationState.history,
                                        event.currentTarget.value
                                    ],
                                    historyPointer: applicationState.history.length
                                });
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
