import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowReview from './pages/ShowReview';
import EditReview from './pages/EditReview';
import DeleteReview from './pages/DeleteReview';
import WriteReview from './pages/WriteReview';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/reviews/create' element={<WriteReview />} />
      <Route path='/reviews/details/:id' element={<ShowReview />} />
      <Route path='/reviews/edit/:id' element={<EditReview />} />
      <Route path='/reviews/delete/:id' element={<DeleteReview />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;