import File from './type/file';
import FileSystem from './type/file-system';
import fileNameFromFilePath from './file-name-from-file-path';
import extensionFromFilePath from './extension-from-file-path';
import directoryFromFilePath from './directory-from-file-path';

type T = (fileSystem: FileSystem) => (filePath: string) => File;

const f: T = fileSystem => filePath => {
    const fileSystemEntry = fileSystem[filePath];

    if (fileSystemEntry === undefined) {
        throw new Error(`No such file: ${filePath}`);
    }

    if (fileSystemEntry === null) {
        throw new Error(`Provided path is a directory: ${filePath}`);
    }

    return {
        name: fileNameFromFilePath(filePath),
        extension: extensionFromFilePath(filePath),
        directory: directoryFromFilePath(filePath)
    };
};

export default f;
