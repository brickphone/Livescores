import './index.css'
import Fixtures from './components/fixtures';
import Navbar from '../src/components/navbar';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Pages/login"

const App = () => {

  return (
      <div>
        <Navbar/>
        <Fixtures />
      </div>
  )
}

export default App;