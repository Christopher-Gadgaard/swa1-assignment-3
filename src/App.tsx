//App.tsx
import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';  
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <LoginForm />
        {/* Other components */}
      </div>
    </Provider>
  );
}

export default App;
