import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api.jsx';

import { BrowserRouter, Route, Routes, Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { PostsPage } from './PostsPage.jsx'

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AccountRegistrationPage } from './AccountRegistrationPage.jsx';
import { LoginPage } from './LoginPage.jsx';
import { authSlice, selectIsLoggedIn } from './redux/authSlice.jsx';


// Create the Redux store
const store = configureStore({
   // Set the accountReducer as the reducer for the 'account' state
   reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer
   },
   middleware: getDefaultMiddleware =>
     getDefaultMiddleware().concat(apiSlice.middleware)
});

export function PrivateOutlet() {
  const is_logged_in = useSelector(selectIsLoggedIn);
  const location = useLocation()

  return is_logged_in ? (
    <Outlet />
  ) : (
    <Navigate to="/account/login" state={{ from: location }} />
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Stranger's Things
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link to="/">
                <Button sx={{ color: '#fff' }}>
                  Home
                </Button>
              </Link>
              <Link to="/posts">
                <Button sx={{ color: '#fff' }}>
                  Posts
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />

          <Routes>
            <Route path="/account/login" element={<LoginPage />} />
            <Route path="/account/register" element={<AccountRegistrationPage />} />
            <Route path="*" element={<PrivateOutlet />}>
              <Route index element={<h1>Hello world</h1>} />
              <Route path="posts" element={<PostsPage />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
