import { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/other_pages/Nav';
import Front from './components/front_page/Front';
import Entries from './components/entries_page/Entries';
import Login from './components/login_page/Login';
import Register from './components/login_page/Register';
import Ask from './components/other_pages/Ask';
import NotFound from './components/other_pages/NotFound';

export const Authorized = createContext(false);

const App = () => {

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setAuthorized(true)
    }
  }, [authorized]);

  return (
    <Authorized.Provider value={authorized}>
      <Nav/>
      <Routes>
        <Route path='/' element={<Front/>}/>
        <Route path='question/:page_id' element={<Entries/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='ask' element={<Ask/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Authorized.Provider>
  );
}

export default App