import FileSystem from './type/file-system';

type T = (fileSystem: FileSystem) => (filePath: string) => boolean;

const f: T = fileSystem => filePath => fileSystem[filePath] === 'file';

export default f;
