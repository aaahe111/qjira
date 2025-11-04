import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth } from './context/auth-context';
import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from './unauthenticated-app';
import { loadServer } from 'jira-dev-tool';

function App() {
  const {user}=useAuth()
  
  // 集成jira-dev-tool，用于生成mock数据
  useEffect(() => {
    loadServer(() => {
      console.log('jira-dev-tool mock server loaded');
    });
  }, []);
  
  return (
    <div className="App">
     {user?<AuthenticatedApp/>:<UnauthenticatedApp/>}
    </div>
  );
}

export default App;