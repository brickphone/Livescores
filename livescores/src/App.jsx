import './index.css'
import Fixtures from './components/fixtures';
import Navbar from '../src/components/navbar';
import { useEffect, useState } from 'react';

const App = () => {

  return (
      <div>
        <Navbar/>
        <Fixtures />
      </div>
  )
}

export default App;