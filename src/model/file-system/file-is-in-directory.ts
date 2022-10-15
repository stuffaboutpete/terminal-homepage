import File from './type/file';

type T = (directory: string) => (file: File) => boolean;

const f: T = directory => file => file.directory === directory;

export default f;
