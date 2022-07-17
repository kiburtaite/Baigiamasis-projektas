import { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Front from './components/front_page/Front';
import Entries from './components/entries_page/Entries';
import Enter from './components/login_page/Enter';
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
      <Routes>
        <Route path="/" element={<Front/>}/>
        <Route path="question/:page_id" element={<Entries/>}/>
        <Route path="login" element={<Enter/>}/>
        <Route path="register" element={<Enter/>}/>
        <Route path="ask" element={<Ask/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Authorized.Provider>
  );
}

export default App