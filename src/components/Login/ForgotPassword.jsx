import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Input, Button, Form, Row, Col } from 'antd';
import { ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoVinFast from '../../assets/logov.svg';
import './ForgotPassword.scss'; // Sử dụng chung SCSS với Login

const { Title, Text } = Typography;

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Kiểm tra email có tồn tại trong hệ thống
            const existingUsers = localStorage.getItem('vinfast_users');
            const users = existingUsers ? JSON.parse(existingUsers) : [];

            const userExists = users.some(user => user.email === values.email);

            if (!userExists) {
                throw new Error('Email không tồn tại trong hệ thống');
            }

            setEmailSent(true);

            toast.success(`Hướng dẫn khôi phục đã gửi đến ${values.email}`, {
                position: "top-right",
                autoClose: 5000,
            });

        } catch (error) {
            toast.error(error.message || 'Gửi email thất bại', {
                position: "top-right",
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container"> {/* Sử dụng cùng class với Login */}
            <ToastContainer />

            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/login')}
                className="back-button"
            >
                Quay lại đăng nhập
            </Button>

            <Row className="login-row">
                {/* Left Side - Background Image (giống Login) */}
                <Col xs={0} md={14} lg={16} className="login-image-section">
                </Col>

                {/* Right Side - Form */}
                <Col xs={24} md={10} lg={8} className="login-form-section">
                    <div className="form-container">
                        {/* Logo giống Login */}
                        <div className="logo-section">
                            <img src={logoVinFast} alt="VinFast Logo" className="logo" />
                        </div>

                        {/* Form Header */}
                        <div className="form-header">
                            <Title level={2} className="form-title">
                                Khôi phục mật khẩu
                            </Title>
                            <Text className="form-subtitle">
                                {emailSent
                                    ? 'Vui lòng kiểm tra email của bạn'
                                    : 'Nhập email để nhận liên kết khôi phục'}
                            </Text>
                        </div>

                        {!emailSent ? (
                            <Form
                                name="forgotPassword"
                                onFinish={onFinish}
                                layout="vertical"
                                requiredMark={false}
                                className="login-form" // Sử dụng cùng class với Login
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
                                        placeholder="Nhập email đăng ký"
                                        size="large"
                                        className="custom-input"
                                        prefix={<FontAwesomeIcon icon={faEnvelope} className="input-icon" />}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="login-btn primary-btn" // Sử dụng cùng class với Login
                                        loading={loading}
                                        htmlType="submit"
                                    >
                                        Gửi hướng dẫn
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <div className="success-message">
                                <div className="success-icon-container">
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="success-icon"
                                    />
                                </div>
                                <Text className="success-text">
                                    Chúng tôi đã gửi email hướng dẫn khôi phục mật khẩu.
                                </Text>
                                <div className="form-links">
                                    <Button
                                        type="primary"
                                        className="login-btn primary-btn"
                                        onClick={() => navigate('/login')}
                                    >
                                        Quay lại đăng nhập
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="form-links">
                            <Text className="register-text">
                                Chưa có tài khoản?{' '}
                                <Link to="/register" className="register-link">
                                    Đăng ký ngay
                                </Link>
                            </Text>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ForgotPassword;