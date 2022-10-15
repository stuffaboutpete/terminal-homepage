type T = (parentDirectory: string) => (childDirectory: string) => boolean;

const f: T = parentDirectory => childDirectory => {
    if (!childDirectory.startsWith(parentDirectory)) return false;
    const remainingPath = childDirectory.replace(parentDirectory, '');
    let match;
    if (parentDirectory === '/') {
        match = remainingPath.match(/^[A-Za-z0-9-.]+$/);
    } else {
        match = remainingPath.match(/^\/[A-Za-z0-9-.]+$/);
    }
    return (match === null) ? false : true;
};

export default f;
