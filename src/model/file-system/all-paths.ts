import FileSystem from './type/file-system';

type T = (fileSystem: FileSystem) => string[];

const f: T = fileSystem => Object.keys(fileSystem);

export default f;
