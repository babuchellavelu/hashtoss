import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';




const rootEl =  document.getElementById('root');

function render() {
  ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
     
     , rootEl);
}

if( module.hot ) {
  module.hot.accept('./app/layout/App', function(){
    setTimeout(render);
  })
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
