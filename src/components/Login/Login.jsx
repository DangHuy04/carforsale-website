import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Input, Button, Form, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import logoVinFast from '../../assets/logov.svg';
import './Login.scss';

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        
        // Giả lập API call
        setTimeout(() => {
            setLoading(false);
            message.success('Đăng nhập thành công!');
            navigate('/');
        }, 1000);
    };

    return (
        <div className="login-container">
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/')}
                className="back-button"
            >
                Về trang chủ
            </Button>

            <Row className="login-row">
                {/* Left Side - Background Image */}
                <Col xs={0} md={14} lg={16} className="login-image-section">
                </Col>

                {/* Right Side - Login Form */}
                <Col xs={24} md={10} lg={8} className="login-form-section">
                    <div className="form-container">
                        {/* Logo */}
                        <div className="logo-section">
                            <img src={logoVinFast} alt="VinFast Logo" className="logo" />
                        </div>

                        {/* Form Header */}
                        <div className="form-header">
                            <Title level={2} className="form-title">
                                Chào mừng!
                            </Title>
                            <Text className="form-subtitle">
                                Đăng nhập vào tài khoản VinFast của bạn
                            </Text>
                        </div>

                        {/* Login Form */}
                        <Form
                            name="login"
                            onFinish={onFinish}
                            layout="vertical"
                            requiredMark={false}
                            className="login-form"
                        >
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Email không hợp lệ!' }
                                ]}
                            >
                                <Input
                                    placeholder="Nhập email của bạn"
                                    size="large"
                                    className="custom-input"
                                    prefix={<FontAwesomeIcon icon={faEnvelope} className="input-icon" />}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Mật khẩu"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                                ]}
                            >
                                <Input.Password
                                    placeholder="Nhập mật khẩu"
                                    size="large"
                                    className="custom-input"
                                    prefix={<FontAwesomeIcon icon={faLock} className="input-icon" />}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            {/* Login Button */}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="login-btn primary-btn"
                                    loading={loading}
                                    htmlType="submit"
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>

                            {/* Links */}
                            <div className="form-links">
                                <Link to="/forgot-password" className="forgot-link">
                                    Quên mật khẩu?
                                </Link>
                                <Text className="register-text">
                                    Chưa có tài khoản?{' '}
                                    <Link to="/register" className="register-link">
                                        Đăng ký ngay
                                    </Link>
                                </Text>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Login;