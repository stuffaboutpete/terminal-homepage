import FileSystem from './type/file-system';
import pipeValue from 'common/src/core/pipe-value';
import filter from 'common/src/array/filter';
import allPaths from './all-paths';
import isFile from './is-file';

type T = (fileSystem: FileSystem) => string[];

const f: T = fileSystem => pipeValue(
    fileSystem,
    allPaths,
    filter(isFile(fileSystem))
);

export default f;
