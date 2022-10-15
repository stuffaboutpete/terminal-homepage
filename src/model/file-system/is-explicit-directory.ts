import FileSystem from './type/file-system';

type T = (fileSystem: FileSystem) => (directoryPath: string) => boolean;

const f: T = fileSystem => directoryPath => fileSystem[directoryPath] === 'directory';

export default f;
