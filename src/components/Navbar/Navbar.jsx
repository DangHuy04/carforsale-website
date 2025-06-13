import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button, Drawer, Space, Dropdown, Avatar, Tooltip } from 'antd';
import { MenuOutlined, UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import logoVinFast from '../../assets/logov.svg';
import './Navbar.scss';

const Navbar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();

    const showSidebar = () => setSidebarVisible(true);
    const closeSidebar = () => setSidebarVisible(false);

    // Scroll behavior để hide/show navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY < 10) {
                // Ở top của trang, luôn hiện navbar
                setIsNavbarVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scroll xuống và đã scroll hơn 100px, ẩn navbar
                setIsNavbarVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scroll lên, hiện navbar
                setIsNavbarVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
    };

    // Menu items cho sidebar
    const sidebarMenuItems = [
        { 
            key: 'home', 
            label: (
                <Link to="/" style={linkStyle} onClick={closeSidebar}>
                    <span className="menu-item">🏠 Trang chủ</span>
                </Link>
            )
        },
        { 
            key: 'cars', 
            label: <span className="menu-item">🚗 Dòng xe VinFast</span>
        },
        { 
            key: 'services', 
            label: <span className="menu-item">⚙️ Dịch vụ</span>
        },
        { 
            key: 'showroom', 
            label: <span className="menu-item">🏢 Showroom</span>
        },
        { 
            key: 'news', 
            label: <span className="menu-item">📰 Tin tức</span>
        },
        { 
            key: 'about', 
            label: <span className="menu-item">ℹ️ Về VinFast</span>
        },
        { 
            key: 'contact', 
            label: <span className="menu-item">📞 Liên hệ</span>
        },
    ];

    // User dropdown menu
    const userMenuItems = [
        {
            key: 'login',
            label: (
                <Link to="/login" style={linkStyle}>
                    <Space>
                        <LoginOutlined />
                        Đăng nhập
                    </Space>
                </Link>
            ),
        },
        {
            key: 'register',
            label: (
                <Link to="/register" style={linkStyle}>
                    <Space>
                        <UserAddOutlined />
                        Đăng ký
                    </Space>
                </Link>
            ),
        },
    ];

    return (
        <div className={`vinfast-navbar ${isNavbarVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
            {/* Left side - Menu button */}
            <div className="navbar-left">
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={showSidebar}
                    className="menu-button"
                >
                    Menu
                </Button>
            </div>

            {/* Center - VinFast Logo */}
            <div className="navbar-center">
                <Tooltip title="Vcar.com" placement="bottom">
            <Link to="/" style={linkStyle}>
                        <div className="logo-container">
                            <img 
                                src={logoVinFast} 
                                alt="VinFast Logo" 
                                className="vinfast-logo"
                            />
                </div>
            </Link>
                </Tooltip>
            </div>

            {/* Right side - User menu */}
            <div className="navbar-right">
                <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                    trigger={['click']}
                >
            <Button
                        type="text"
                        className="user-button"
                    >
                        <Avatar 
                            size="small" 
                            icon={<UserOutlined />} 
                            className="user-avatar"
                        />
                    </Button>
                </Dropdown>
            </div>

            {/* Sliding Sidebar Menu */}
            <Drawer
                title={
                    <div className="sidebar-header">
                        <img 
                            src={logoVinFast} 
                            alt="VinFast" 
                            className="sidebar-logo"
                        />
                        <span className="sidebar-title">VinFast Menu</span>
                    </div>
                }
                placement="left"
                onClose={closeSidebar}
                open={sidebarVisible}
                bodyStyle={{ padding: 0 }}
                className="vinfast-sidebar"
                width={280}
            >
                <Menu
                    mode="vertical"
                    onClick={closeSidebar}
                    items={sidebarMenuItems}
                    className="sidebar-menu"
                />
                
                {/* Bottom section of sidebar */}
                <div className="sidebar-footer">
                    <div className="sidebar-contact">
                        <h4>Liên hệ hỗ trợ</h4>
                        <p>📞 1900 23 23 89</p>
                        <p>✉️ support@vinfast.vn</p>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Navbar;