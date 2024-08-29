import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/profile' Component={Profile}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
