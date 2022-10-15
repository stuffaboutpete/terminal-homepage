import FileSystem from './type/file-system';
import pipeValue from 'common/src/core/pipe-value';
import contains from 'common/src/array/contains';
import allDirectoryPaths from './all-directory-paths';

type T = (fileSystem: FileSystem) => (directory: string) => boolean;

const f: T = fileSystem => directory => pipeValue(
    fileSystem,
    allDirectoryPaths,
    contains(directory)
);

export default f;
