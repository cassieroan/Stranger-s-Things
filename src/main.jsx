import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api.jsx';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { PostsPage } from './PostsPage.jsx'

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


// Create the Redux store
const store = configureStore({
   // Set the accountReducer as the reducer for the 'account' state
   reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
   },
   middleware: getDefaultMiddleware =>
     getDefaultMiddleware().concat(apiSlice.middleware)
});

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
            <Route path="/" element={<h1>Hello world</h1>} />
            <Route path="/posts" element={<PostsPage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
