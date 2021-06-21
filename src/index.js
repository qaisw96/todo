import 'bootstrap/dist/css/bootstrap.min.css';


import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/todo/app.js';

const Main = () => {
    return <App />;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
