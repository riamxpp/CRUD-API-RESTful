import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/profile' Component={Profile }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
