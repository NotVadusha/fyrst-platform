import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';
import BookingPage from './pages/BookingPage';
import TimeCardPage from './pages/TimeCard';
import ProfilePage from './pages/ProfilePage';
import MessangerPage from './pages/MessangerPage';
import EmployesPage from './pages/EmployesPage';

function App() {
  return (
    <Routes>
      <Route path='booking' element={<BookingPage />}>
        <Route index element={<div />} />
        <Route path=':id' element={<div />} />
        <Route path='create' element={<div />} />
      </Route>

      <Route path='timecard' element={<TimeCardPage />}>
        <Route index element={<div />} />
        <Route path=':id' element={<div />} />
        <Route path='create' element={<div />} />
      </Route>

      <Route path='profile/:id' element={<ProfilePage />}>
        <Route path='edit' element={<div />} />
        <Route path='notifications' element={<div />} />
        <Route path='security' element={<div />} />
      </Route>

      <Route path='messanger' element={<MessangerPage />}></Route>

      <Route path='payment' element={<div />}>
        <Route path=':id' element={<div />} />
      </Route>

      <Route path='auth' element={<AuthPage />}>
        <Route path='login' element={<div />}>
          <Route index element={<div />} />
          <Route path='forgot' element={<div />} />
          <Route path='reset' element={<div />} />
          <Route path='final' element={<div />} />
        </Route>
        <Route path='signup' element={<div />} />
      </Route>

      <Route path='employe' element={<EmployesPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
