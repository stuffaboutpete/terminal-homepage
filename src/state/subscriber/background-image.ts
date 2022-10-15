import Subscriber from '../type/subscriber';

const body = document.querySelector('body');

if (!body) throw new Error('Unexpected error: no body found')

const f: Subscriber = (action, payload, state, previousState, dispatch) => {
    if (action !== 'INIT' && state.backgroundImage === previousState.backgroundImage) return;
    body.style.backgroundImage = `url(https://picsum.photos/id/${state.backgroundImage}/1920/1080)`;
};

export default f;
