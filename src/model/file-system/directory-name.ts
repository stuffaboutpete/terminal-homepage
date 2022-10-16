type T = (directoryPath: string) => string;

const f: T = path => {
    if (path === '/') return path;
    const name = path.split('/').pop();
    if (!name) throw new Error('Unexpected error');
    return name;
};

export default f;
