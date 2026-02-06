import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home.jsx';
import Signup from './pages/signup';
import Login from './pages/login';
import SocialPage from "./pages/posts.jsx";
import PostDetails from "./pages/postDetail.jsx";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  return token ? children : <Navigate to="/login" />;
};

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post/:id" element={
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>} />

        <Route path="/posts" element={
          <PrivateRoute>
            <SocialPage />
          </PrivateRoute>
        } />
      </Routes>
    </>
  )
}

export default App;
