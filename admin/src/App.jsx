// import React from 'react'
import './app.css';

import { Routes, Route } from 'react-router-dom';
import { Dashboard, MessageForm, ProjectForm } from './pages';

const App = () => {
    // console.log(data);
  return (
    <>
    <Routes>
      <Route path='/' element={ <Dashboard />} />
      <Route path='/msgForm' element={ <MessageForm /> } />
      <Route path='/msgForm/:id' element={ <MessageForm /> } />
      <Route path='/projectForm' element={ <ProjectForm />} />
      <Route path='/projectForm/:id' element={ <ProjectForm />} />
    </Routes>
    </>
  )
}

export default App