import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import StudentWallet from '../pages/StudentWallet';
import { EmployerVerification } from '../pages/EmployerVerification';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wallet" element={<StudentWallet />} />
        <Route path="/verify" element={<EmployerVerification />} />
      </Routes>
    </BrowserRouter>
  );
}