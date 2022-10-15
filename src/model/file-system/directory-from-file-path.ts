type T = (filePath: string) => string;

const f: T = filePath => {
    const match = filePath.match(/^([/A-Za-z0-9-.]*)\/[A-Za-z0-9-.]+\.[A-Za-z]+$/);
    if (match === null) throw new Error(`Invalid file path: ${filePath}`);
    return match[1] === '' ? '/' : match[1];
};

export default f;
