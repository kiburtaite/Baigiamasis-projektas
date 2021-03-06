import { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/other_pages/Nav';
import Front from './components/front_page/Front';
import Entries from './components/entries_page/Entries';
import Login from './components/login_page/Login';
import Register from './components/login_page/Register';
import Ask from './components/other_pages/Ask';
import NotFound from './components/other_pages/NotFound';

export const Context = createContext({});

const App = () => {

  const [authorized, setAuthorized] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token){
      setAuthorized(true)
    }
  }, [token]);

  return (
    <Context.Provider value={{ authorized, setAuthorized }}>
      <Nav/>
      <section>
      <Routes>
        <Route path='/' element={<Front/>}/>
        <Route path='question/:page_id' element={<Entries/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='ask' element={<Ask/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </section>
    </Context.Provider>
  );
}

export default App