import File from './type/file';

type T = (file: File) => string;

const f: T = file => `${file.name}.${file.extension}`;

export default f;
