import FileSystem from './type/file-system';
import pipeValue from 'common/src/core/pipe-value';
import map from 'common/src/array/map';
import filter from 'common/src/array/filter';
import allPaths from './all-paths';
import allFilePaths from './all-file-paths';
import isExplicitDirectory from './is-explicit-directory';
import directoryFromFilePath from './directory-from-file-path';
import parentDirectories from './parent-directories';

type T = (fileSystem: FileSystem) => string[];

const f: T = fileSystem => {
    const statedDirectories = pipeValue(
        fileSystem,
        allPaths,
        filter(isExplicitDirectory(fileSystem))
    );

    const fileDirectories = pipeValue(
        fileSystem,
        allFilePaths,
        map(directoryFromFilePath)
    );

    const impliedDirectories = pipeValue(
        fileDirectories,
        // TODO array/flatMap function in common
        directory => directory.flatMap(parentDirectories)
    );

    // TODO array/unique function in common
    return [...new Set([
        ...statedDirectories,
        ...fileDirectories,
        ...impliedDirectories
    ])]
};

export default f;
