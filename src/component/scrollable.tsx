import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './scrollable.scss';

interface Props {
    children?: React.ReactNode;
    scrollX?: number;
    scrollY?: number;
    onScroll?: (scrollPosition: { x: number, y: number }) => void;
    onScrollX?: (scrollPosition: number) => void;
    onScrollY?: (scrollPosition: number) => void;
    hideScrollBars?: boolean;
}

const Scrollable = (props: Props) => {
    const rootRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        if (!rootRef.current) throw new Error('Unexpected error');

        if (props.scrollX) rootRef.current.scrollLeft = props.scrollX;
        if (props.scrollY) rootRef.current.scrollTop = props.scrollY;
    }, [props.scrollX, props.scrollY]);

    return (
        <PerfectScrollbar
            className={`scrollable ${props.hideScrollBars ? 'scrollable--hiddenScrollBars' : ''}`}
            containerRef={ref => rootRef.current = ref}
            onScrollX={event => {
                props.onScroll && props.onScroll({ x: event.scrollLeft, y: event.scrollTop })
                props.onScrollX && props.onScrollX(event.scrollLeft)
            }}
            onScrollY={event => {
                props.onScroll && props.onScroll({ x: event.scrollLeft, y: event.scrollTop })
                props.onScrollY && props.onScrollY(event.scrollTop)
            }}
        >
            {props.children}
        </PerfectScrollbar>
    );
};

export default Scrollable;
