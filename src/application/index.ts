import ApplicationList from '../model/application/type/application-list';
import changeDirectory from './change-directory';
import colors from './colors';
import confetti from './confetti';
import file from './file';
import files from './files';
import help from './help';
import intro from './intro';
import listFiles from './list-files';
import terminal from './terminal';
import viewFile from './view-file';

const applications: ApplicationList = [
    changeDirectory,
    colors,
    confetti,
    file,
    files,
    help,
    intro,
    listFiles,
    terminal,
    viewFile
];

export default applications;
