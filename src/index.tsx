import React from 'react';
import ReactDOM, { render } from 'react-dom';
import StateManager from './component/state-manager';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <StateManager />
    </React.StrictMode>,
    document.getElementById('root')
);
