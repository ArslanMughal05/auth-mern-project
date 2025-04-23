import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefrsHandler from './RefrsHandler';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const PrivateRoute = ({ element }) => {
      return isAuthenticated ? element : <Navigate to={"/login"} />
    }

  return (
    <div className="App">
      <RefrsHandler setIsAuthenticated={setIsAuthenticated} />
      
      <Routes>

         <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Login />
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Signup />
          }
        />

        <Route 
        path='/home' 
        element={<PrivateRoute element={<Home setIsAuthenticated={setIsAuthenticated} />} />} />

      </Routes>
    </div>
  );
}

export default App;
