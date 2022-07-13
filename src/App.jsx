import { Routes, Route } from 'react-router-dom';
import Questions from './components/Questions';
import Answers from './components/Answers';
import Enter from './components/Enter';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Questions/>}/>
        <Route path="questions" element={<Questions/>}/>
        <Route path="questions/:page_id" element={<Answers/>}/>
        <Route path="login" element={<Enter/>}/>
        <Route path="register" element={<Enter/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App