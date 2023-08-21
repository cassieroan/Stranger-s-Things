import React from 'react'
import ReactDOM from 'react-dom/client'
import { PostsPage } from './PostsPage.jsx'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './index.css'
import { apiSlice } from './api.jsx';

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
        <div id="navbar">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
        </div>
        <Routes>
          <Route path="/" element={<h1>Hello world</h1>} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
