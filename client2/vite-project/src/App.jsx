import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import AppLayout from './components/AppLayout';
import MoviePage from './components/MoviePage';
import AdminPage from './components/admin';
import ProfilePage from './components/Profile';
import WatchListPage from './components/WatchListPage';

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <div>Loading...</div>; // Replace with a better loading component if needed
  }

  return user ? children : <Navigate to="/login" />;
};


const AdminRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <div>Loading...</div>; // Replace with a better loading component if needed
  }

  return (user && user.user_type === "admin" )? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Use AppLayout for all routes */}
          <Route path="/" element={<AppLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="protected"
              element={
                <PrivateRoute>
                  <Protected />
                </PrivateRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <PrivateRoute>
                  <MoviePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/watchlist"
              element={
                <PrivateRoute>
                  <WatchListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
