import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CarDetail from './components/CarDetail/CarDetail';
import CarOverview from './components/CarDetail/CarOverview';
import VF7Detail from './components/CarDetail/VF7Detail';
import './App.css';
import ForgotPassword from './components/Login/ForgotPassword';

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/car/:id/overview" element={<CarOverview />} />
            <Route path="/vf7-detail" element={<VF7Detail />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/forgot-password" element={<ForgotPassword to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
}

export default App;