const path = require('path');
const fs = require('fs');
const walk = require('walkdir');

const output = {};

const emitter = walk('../..', function (filePath, stats) {
    const baseName = path.basename(filePath);

    if (baseName === '.git' || baseName === 'node_modules' || baseName === 'src/directory-structure') {
        this.ignore(filePath);
    }

    const relativePath = '/' + filePath.replace(path.resolve('../..') + '/', '');

    if (relativePath === '/.gitignore') return;
    if (relativePath === '/webpack.config.js') return; // TODO TEMP

    if (stats.isDirectory()) {
        output[relativePath] = undefined;
        return;
    }

    if (['.png', '.ico'].includes(path.extname(filePath))) return;

    output[relativePath] = 'file';
});

emitter.on('end', () => {
    const fileContents = [
        `import FileSystem from '../model/file-system/type/file-system';`,
        '',
        `const files: FileSystem = ${JSON.stringify(output, null, 4)};`,
        '',
        'export default files;',
        ''
    ].join('\n');
    fs.writeFile(
        path.resolve(__dirname, 'index.ts'),
        fileContents,
        error => {
            if (error) return console.error;
            console.log('Directory structure recorded');
        }
    );
});
