import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { DevTools, loadServer } from "jira-dev-tool";
import { AppProviders } from './context/index';
import './wdyr';

// 初始化jira-dev-tool
loadServer(() => 
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
        <DevTools />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root')
  )
);

// 在应用渲染后调用 reportWebVitals
reportWebVitals();
