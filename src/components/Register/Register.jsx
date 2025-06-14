import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Input, Button, Form, message, Row, Col } from 'antd';
import { ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import logoVinFast from '../../assets/logov.svg';
import './Register.scss';

const { Title, Text } = Typography;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        
        // Giả lập API call
        setTimeout(() => {
            setLoading(false);
            message.success('Đăng ký thành công!');
            navigate('/login');
        }, 1000);
    };

    // Kiểm tra các yêu cầu mật khẩu
    const passwordRequirements = [
        {
            text: 'Ít nhất 8 ký tự',
            isValid: password.length >= 8
        },
        {
            text: 'Chứ hoa và chữ thường',
            isValid: /(?=.*[a-z])(?=.*[A-Z])/.test(password)
        },
        {
            text: 'Ít nhất 1 số',
            isValid: /(?=.*\d)/.test(password)
        }
    ];

    return (
        <div className="register-container">
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/')}
                className="back-button"
            >
                Về trang chủ
            </Button>

            <Row className="register-row">
                {/* Left Side - Background Image */}
                <Col xs={0} md={14} lg={16} className="register-image-section">
                </Col>

                {/* Right Side - Register Form */}
                <Col xs={24} md={10} lg={8} className="register-form-section">
                    <div className="form-container">
                        {/* Logo */}
                        <div className="logo-section">
                            <img src={logoVinFast} alt="VinFast Logo" className="logo" />
                        </div>

                        {/* Form Header */}
                        <div className="form-header">
                            <Title level={2} className="form-title">
                                Tạo tài khoản VinFast
                            </Title>
                            <Text className="form-subtitle">
                                Đăng ký để trải nghiệm các dịch vụ tốt nhất
                            </Text>
                        </div>

                        {/* Register Form */}
                        <Form
                            name="register"
                            onFinish={onFinish}
                            layout="vertical"
                            requiredMark={false}
                            className="register-form"
                        >
                            <Form.Item
                                name="fullName"
                                label="Họ và tên"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập họ và tên!' },
                                    { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự!' }
                                ]}
                            >
                                <Input
                                    placeholder="Nhập họ và tên của bạn"
                                    size="large"
                                    className="custom-input"
                                    prefix={<FontAwesomeIcon icon={faUser} className="input-icon" />}
                                />
                            </Form.Item>

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
                                    { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
                                    {
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                        message: 'Mật khẩu phải chứa chữ hoa, chữ thường và số!'
                                    }
                                ]}
                            >
                                <Input.Password
                                    placeholder="Nhập mật khẩu"
                                    size="large"
                                    className="custom-input"
                                    prefix={<FontAwesomeIcon icon={faLock} className="input-icon" />}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Item>

                            {/* Password Requirements */}
                            {password && (
                                <div className="password-requirements">
                                    <div className="requirements-title">Mật khẩu bao gồm</div>
                                    {passwordRequirements.map((requirement, index) => (
                                        <div key={index} className={`requirement-item ${requirement.isValid ? 'valid' : 'invalid'}`}>
                                            <FontAwesomeIcon 
                                                icon={faCheck} 
                                                className={`check-icon ${requirement.isValid ? 'valid' : 'invalid'}`}
                                            />
                                            <span className="requirement-text">{requirement.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Form.Item
                                name="confirmPassword"
                                label="Xác nhận mật khẩu"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="Nhập lại mật khẩu"
                                    size="large"
                                    className="custom-input"
                                    prefix={<FontAwesomeIcon icon={faLock} className="input-icon" />}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            {/* Register Button */}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="register-btn primary-btn"
                                    loading={loading}
                                    htmlType="submit"
                                >
                                    Tạo tài khoản
                                </Button>
                            </Form.Item>

                            {/* Links */}
                            <div className="form-links">
                                <Text className="login-text">
                                    Đã có tài khoản?{' '}
                                    <Link to="/login" className="login-link">
                                        Đăng nhập ngay
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

export default Register; 