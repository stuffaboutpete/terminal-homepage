import FileSystem from './type/file-system';
import pipeValue from 'common/src/core/pipe-value';
import filter from 'common/src/array/filter';
import map from 'common/src/array/map';
import split from 'common/src/string/split';
import last from 'common/src/array/last';
import allDirectoryPaths from './all-directory-paths';
import directoryIsInDirectory from './directory-is-in-directory';

type T = (fileSystem: FileSystem) => (directory: string) => string[];

const f: T = fileSystem => directory => pipeValue(
    fileSystem,
    allDirectoryPaths,
    filter(directoryIsInDirectory(directory)),
    map(split('/')),
    map(last)
);

export default f;
