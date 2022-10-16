import React, { useLayoutEffect } from 'react';
import Prism from 'prismjs';

Prism.manual = true;

interface IProps {
    code: string;
    language: string;
}

const Code = (props: IProps) => {
    useLayoutEffect(() => { Prism.highlightAll() }, []);
    return (
        <pre>
            <code className={`language-${props.language}`}>
                {props.code}
            </code>
        </pre>
    );
};

export default Code;
