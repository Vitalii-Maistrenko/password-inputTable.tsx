import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import LoginForm from './components/form/LoginForm';
import ConditionalTable from './components/ConditionalTable/ConditionalTable';
import { MyForm } from './components/types';

function App() {
  const [authenticationResult, setAuthenticationResult] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = ({ login, parol }: MyForm) => {
    setAuthenticationResult(null);

    setTimeout(() => {
      if (login === 'testuser' && parol === 'testpassword123') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/table');
      } else {
        setAuthenticationResult('Authentication failed. Please check your login and password.');
      }
    }, 2000);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <div className="form-container">
        <Routes>
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        </Routes>
        {authenticationResult && (
          <p className={authenticationResult.includes('failed') ? 'error-message' : 'success-message'}>
            {authenticationResult}
          </p>
        )}
      </div>
      <div className="table-container">
        <Routes>
          <Route path="/table" element={<ConditionalTable />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

