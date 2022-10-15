import Application from './type/application';
import ApplicationList from './type/application-list';

type T = (list: ApplicationList, applicationName: string) => Application<{}> | undefined;

const f: T = (list, name) => list.find(application => {
    if (application.name === name) return true;
    return application.aliases?.includes(name);
});

export default f;
