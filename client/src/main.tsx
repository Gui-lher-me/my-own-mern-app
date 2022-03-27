import { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.css';
import { App } from './App';

const el = document.querySelector('#root');

render(
  <StrictMode>
    <App />
  </StrictMode>,
  el
);
