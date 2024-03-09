import Application from '../../model/application/type/application';
import State from './state';
import Terminal from './terminal';
import defaultState from './default-state';

const terminal: Application<State, {}> = {
    name: 'terminal',
    defaultState,
    windowRenderer: Terminal,
    initialize: async (args, { activateWindow, setState, executeCommand, onHelpButton, onGuiMessage, onChildProcessOutput, onChildProcessExit, onChildProcessError, onChildProcessLaunchError, applicationState, detach }) => {
        onGuiMessage(message => {
            const inputCommand = (message as { command: string }).command.trim();
            let executedCommand = inputCommand;
            if (['clear', 'c'].includes(inputCommand)) {
                setState(applicationState => ({
                    input: '',
                    history: [
                        ...applicationState.history,
                        inputCommand
                    ],
                    historyPointer: applicationState.history.length,
                    commandHistory: []
                }));
                return;
            }
            if (['files'].includes(inputCommand)) {
                const currentDirectory = applicationState().currentDirectory;
                executedCommand += ` ${currentDirectory}`;
            }
            const childProcessId = executeCommand(executedCommand);
            setState(applicationState => ({
                input: '',
                history: [
                    ...applicationState.history,
                    inputCommand
                ],
                historyPointer: applicationState.history.length,
                activeProcess: true,
                commandHistory: [
                    ...applicationState.commandHistory,
                    {
                        processId: childProcessId,
                        input: inputCommand
                    }
                ]
            }));
        });
        onChildProcessOutput((processId, output) => {
            setState(state => {
                const commandHistory = state.commandHistory;
                const commandIndex = commandHistory.findIndex(command => command.processId === processId)!;
                return {
                    commandHistory: [
                        ...commandHistory.slice(0, commandIndex),
                        {
                            ...commandHistory[commandIndex],
                            lastOutput: output
                        },
                        ...commandHistory.slice(commandIndex + 1)
                    ]
                };
            });
        });
        onChildProcessError((processId, error) => {
            setState(state => {
                const commandHistory = state.commandHistory;
                const command = commandHistory[commandHistory.length - 1];
                if (command.processId !== processId) return {};
                return {
                    activeProcess: false,
                    commandHistory: [
                        ...commandHistory.slice(0, -1),
                        {
                            ...commandHistory[commandHistory.length - 1],
                            lastOutput: error,
                            error: true
                        }
                    ]
                };
            });
        }),
        onChildProcessLaunchError(processId => {
            setState(state => {
                const commandHistory = state.commandHistory;
                const command = commandHistory[commandHistory.length - 1];
                if (command.processId !== processId) return {};
                return {
                    activeProcess: false,
                    commandHistory: [
                        ...commandHistory.slice(0, -1),
                        {
                            ...commandHistory[commandHistory.length - 1],
                            lastOutput: 'Unknown command',
                            error: true
                        }
                    ]
                };
            })
        }),
        onChildProcessExit(processId => {
            const commandHistory = applicationState().commandHistory;
            if (commandHistory[commandHistory.length - 1].processId === processId) {
                setState({ activeProcess: false });
            }
        });
        activateWindow('Terminal');
        detach();
        setTimeout(() => setState({ input: 'i' }), 1500);
        setTimeout(() => setState({ input: 'in' }), 1600);
        setTimeout(() => setState({ input: 'int' }), 1700);
        setTimeout(() => setState({ input: 'intr' }), 1800);
        setTimeout(() => setState({ input: 'intro' }), 1900);
        setTimeout(() => {
            const childProcessId = executeCommand('intro');
            setState({
                input: '',
                history: ['intro'],
                historyPointer: 0,
                activeProcess: true,
                commandHistory: [{
                    processId: childProcessId,
                    input: 'intro'
                }]
            });
        }, 2300);
        onHelpButton(() => {
            setTimeout(() => setState({ input: 'h' }), 0);
            setTimeout(() => setState({ input: 'he' }), 100);
            setTimeout(() => setState({ input: 'hel' }), 200);
            setTimeout(() => setState({ input: 'help' }), 300);
            setTimeout(() => {
                const state = applicationState();
                const childProcessId = executeCommand('help');
                setState({
                    input: '',
                    history: [
                        ...state.history,
                        'help'
                    ],
                    historyPointer: state.historyPointer + 1,
                    activeProcess: true,
                    commandHistory: [
                        ...state.commandHistory,
                        {
                            processId: childProcessId,
                            input: 'help'
                        }
                    ]
                });
            }, 700);
        })
    }
};

export default terminal;
