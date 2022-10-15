import FileSystem from './type/file-system';
import File from './type/file';
import pipeValue from 'common/src/core/pipe-value';
import map from 'common/src/array/map';
import allFilePaths from './all-file-paths';
import fileFromFilePath from './file-from-file-path';

type T = (fileSystem: FileSystem) => File[];

const f: T = fileSystem => pipeValue(
    fileSystem,
    allFilePaths,
    map(fileFromFilePath(fileSystem))
);

export default f;
