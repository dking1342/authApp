import React from 'react';
import Header from './components/Header';
import { UserProvider } from './context/store';

const App = () => {
  return (
    <UserProvider>
      <Header />
      <div>
        jwt app
      </div>
    </UserProvider>
  )
}

export default App
