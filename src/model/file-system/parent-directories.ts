import pipeValue from 'common/src/core/pipe-value';
import split from 'common/src/string/split';
import middle from 'common/src/array/middle';
import reduce from 'common/src/array/reduce';
import last from 'common/src/array/last';

type T = (directory: string) => string[];

const f: T = directory => {
    return pipeValue(
        directory,
        split('/'),
        middle,
        reduce((out, next) => {
            const previous = out.length === 0 ? '' : last(out);
            return [...out, `${previous}/${next}`]
        }, []),
        directories => ['/', ...directories]
    );
};

export default f;
