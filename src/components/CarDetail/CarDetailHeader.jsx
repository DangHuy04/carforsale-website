import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logoVinFast from '../../assets/logov.svg';
import './CarDetailHeader.scss';

const CarDetailHeader = ({ carName, carPrice }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const stickyRef = useRef(null);

  const menuItems = [
    { label: 'Xe', path: '/' },
    { label: 'Hỗ trợ', path: '/support' },
    { label: 'Tin tức', path: '/news' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        const headerHeight = 65; // Height của header chính
        const isSticky = window.scrollY > headerHeight;
        setIsScrolled(isSticky);
        
        // Debug log
        console.log('Scroll Y:', window.scrollY, 'Header Height:', headerHeight, 'Is Sticky:', isSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="car-detail-header-wrapper">
      {/* Header chính - Không sticky */}
      <div className="car-detail-header">
        <div className="header-container">
          {/* Menu bên trái - Desktop */}
          <div className="header-left">
            <nav className="main-nav desktop-nav">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="nav-item"
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* Hamburger menu - Mobile */}
            <Button 
              type="text" 
              icon={isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>

          {/* Logo trung tâm */}
          <div className="header-center">
            <div className="logo-container" onClick={() => navigate('/')}>
              <img src={logoVinFast} alt="VinFast" className="logo" />
            </div>
          </div>

          {/* Icon bên phải */}
          <div className="header-right">
            <Button 
              type="text" 
              icon={<UserOutlined />} 
              className="account-btn"
              onClick={() => navigate('/login')}
            >
              <span className="account-text">Tài khoản</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="mobile-nav-item"
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phần thông tin sản phẩm - Sticky */}
      <div 
        ref={stickyRef}
        className={`product-info-sticky ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="product-container">
          <div className="product-name">
            <h1>{carName}</h1>
          </div>
          <div className="product-price">
            <span className="price-label">Giá tạm tính</span>
            <span className="price-value">{carPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailHeader; 