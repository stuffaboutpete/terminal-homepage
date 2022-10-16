import React from 'react';
import ApplicationToolkit from '../../model/application/type/application-toolkit';
import Code from '../../component/code';
import State from './state';
import './root.scss';

const Root = ({ applicationState }: ApplicationToolkit<State>) => (
    <div className="application-file-root">
        {applicationState.fileContents && (
            <Code
                code={applicationState.fileContents}
                language={applicationState.fileName?.split('.').pop() || 'ts'}
            />
        )}
    </div>
);

export default Root;
