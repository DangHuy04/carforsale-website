import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button, Drawer, Space, Dropdown, Avatar, Tooltip } from 'antd';
import { MenuOutlined, UserOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faWrench, faBuilding, faNewspaper, faInfoCircle, faPhone, faEnvelope, faSignInAlt, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import logoVinFast from '../../assets/logov.svg';
import './Navbar.scss';

const Navbar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra xem có user đã đăng nhập không
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            setCurrentUser(user);
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                setIsNavbarVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsNavbarVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsNavbarVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const showSidebar = () => setSidebarVisible(true);
    const closeSidebar = () => setSidebarVisible(false);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        navigate('/');
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
    };

    // Hàm lấy tên hiển thị từ email (bỏ phần @gmail.com)
    const getDisplayName = (email) => {
        if (!email) return '';
        return email.split('@')[0];
    };

    // Menu items cho sidebar
    const sidebarMenuItems = [
        {
            key: 'home',
            label: (
                <Link to="/" style={linkStyle} onClick={closeSidebar}>
                    <span className="menu-item">
                        <FontAwesomeIcon icon={faHome} className="menu-icon" />
                        Trang chủ
                    </span>
                </Link>
            )
        },
        {
            key: 'cars',
            label: (
                <Link to="/cars" style={linkStyle} onClick={closeSidebar}>
                    <span className="menu-item">
                        <FontAwesomeIcon icon={faCar} className="menu-icon" />
                        Dòng xe VinFast
                    </span>
                </Link>
            )
        },
        {
            key: 'services',
            label: (
                <Link to="/services" style={linkStyle} onClick={closeSidebar}>
                    <span className="menu-item">
                        <FontAwesomeIcon icon={faWrench} className="menu-icon" />
                        Dịch vụ
                    </span>
                </Link>
            )
        },
        {
            key: 'showroom',
            label: (
                <Link to="/showroom" style={linkStyle} onClick={closeSidebar}>
                    <span className="menu-item">
                        <FontAwesomeIcon icon={faBuilding} className="menu-icon" />
                        Showroom
                    </span>
                </Link>
            )
        },
        {
            key: 'news',
            label: (
                <Link to="/news" style={linkStyle} onClick={closeSidebar}>
                    <span className="menu-item">
                        <FontAwesomeIcon icon={faNewspaper} className="menu-icon" />
                        Tin tức
                    </span>
                </Link>
            )
        },
        {
            key: 'about',
            label: (
                <Link to="/about" style={linkStyle} onClick={closeSidebar}>
                    <span className="menu-item">
                        <FontAwesomeIcon icon={faInfoCircle} className="menu-icon" />
                        Về VinFast
                    </span>
                </Link>
            )
        },
        {
            key: 'contact',
            label: (
                <Link to="/contact" style={linkStyle} onClick={closeSidebar}>
                    <span className="menu-item">
                        <FontAwesomeIcon icon={faPhone} className="menu-icon" />
                        Liên hệ
                    </span>
                </Link>
            )
        },
    ];

    // User dropdown menu khi chưa đăng nhập
    const guestMenuItems = [
        {
            key: 'login',
            label: (
                <Link to="/login" style={linkStyle} className="user-menu-item">
                    <LoginOutlined className="user-menu-icon" />
                    <span>Đăng nhập</span>
                </Link>
            ),
        },
        {
            key: 'register',
            label: (
                <Link to="/register" style={linkStyle} className="user-menu-item">
                    <UserAddOutlined className="user-menu-icon" />
                    <span>Đăng ký</span>
                </Link>
            ),
        },
    ];

    // User dropdown menu khi đã đăng nhập
    const userMenuItems = [
        {
            key: 'profile',
            label: (
                <div className="user-menu-profile">
                    <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        className="user-avatar"
                    />
                    <span className="username">
                        {getDisplayName(currentUser?.email)}
                    </span>
                </div>
            ),
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: (
                <div className="user-menu-item" onClick={handleLogout}>
                    <LogoutOutlined className="user-menu-icon" />
                    <span>Đăng xuất</span>
                </div>
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
                    menu={{ items: currentUser ? userMenuItems : guestMenuItems }}
                    placement="bottomRight"
                    trigger={['click']}
                    overlayClassName="user-dropdown-menu"
                >
                    <Button
                        type="text"
                        className="user-button"
                    >
                        <div className="user-avatar-container">
                            {currentUser ? (
                                <Avatar
                                    size="small"
                                    icon={<UserOutlined />}
                                    className="user-avatar"
                                />
                            ) : (
                                <FontAwesomeIcon icon={faUser} className="user-avatar-icon" />
                            )}
                        </div>
                    </Button>
                </Dropdown>
            </div>

            {/* Sliding Sidebar Menu */}
            <Drawer
                title={null}
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
            </Drawer>
        </div>
    );
};

export default Navbar;