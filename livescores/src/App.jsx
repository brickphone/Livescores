import './index.css'
import Fixtures from './components/fixtures';
import Navbar from '../src/components/navbar';
import { useEffect, useState } from 'react';
import AuthProvider from './provider/authProvider';

const App = () => {

  return (
      <div>
        <AuthProvider>
            <Navbar/>
            <Fixtures />
        </AuthProvider>
      </div>
  )
}

export default App;