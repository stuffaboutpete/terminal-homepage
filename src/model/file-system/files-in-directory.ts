import FileSystem from './type/file-system';
import pipeValue from 'common/src/core/pipe-value';
import map from 'common/src/array/map';
import filter from 'common/src/array/filter';
import allFiles from './all-files';
import fileIsInDirectory from './file-is-in-directory';
import fileNameFromFile from './file-name-from-file';

type T = (fileSystem: FileSystem) => (directory: string) => string[];

const f: T = fileSystem => directory => pipeValue(
    fileSystem,
    allFiles,
    filter(fileIsInDirectory(directory)),
    map(fileNameFromFile)
);

export default f;
