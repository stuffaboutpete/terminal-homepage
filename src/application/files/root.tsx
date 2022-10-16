import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileCode, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import ApplicationToolkit from '../../model/application/type/application-toolkit';
import State from './state';
import directoriesInDirectory from '../../model/file-system/directories-in-directory';
import filesInDirectory from '../../model/file-system/files-in-directory';
import parentDirectories from '../../model/file-system/parent-directories';
import directoryName from '../../model/file-system/directory-name';
import './root.scss';

const Root = ({ applicationState, globalState, executeCommand, setState }: ApplicationToolkit<State>) => {
    const currentDirectory = applicationState.currentDirectory;
    const directories = directoriesInDirectory(globalState.files)(currentDirectory);
    const files = filesInDirectory(globalState.files)(currentDirectory);
    return (
        <div className="application-files-root">
            <ul className="application-files-root-path">
                {currentDirectory !== '/' && parentDirectories(currentDirectory).map((directory, index) => (
                    <li key={index}>
                        <button onClick={() => setState({ currentDirectory: directory })}>
                            {directoryName(directory)}
                        </button>
                    </li>
                ))}
                <li className="application-files-root-currentDirectory">
                    {directoryName(currentDirectory)}
                </li>
            </ul>
            <ul className="application-files-root-files">
                {directories.map(directory => (
                    <li
                        key={directory}
                        onClick={() => setState({
                            currentDirectory: currentDirectory === '/'
                                ? `/${directory}`
                                : `${currentDirectory}/${directory}`
                        })}
                    >
                        <FontAwesomeIcon icon={faFolder} />
                        <span>{directory}</span>
                    </li>
                ))}
                {files.map(file => (
                    <li
                        key={file}
                        onClick={() => {
                            if (currentDirectory === '/') {
                                executeCommand(`file /${file}`);
                            } else {
                                executeCommand(`file ${currentDirectory}/${file}`);
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faFileCode} />
                        <span>{file}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Root;
