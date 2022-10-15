import Provider from '../../state/type/provider';
// import { ResizeObserver } from '@juggle/resize-observer';

const f: Provider = dispatch => {
    const dispatchBrowserSizeChange = () => dispatch('BROWSER_SIZE_CHANGE', {
        width: window.innerWidth,
        height: window.innerHeight
    });
    window.addEventListener('resize', dispatchBrowserSizeChange);
    dispatchBrowserSizeChange();
};

export default f;
