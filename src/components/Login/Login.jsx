import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Input, Button, Form, Space, Card, message } from 'antd';
import { UserOutlined, LockOutlined, CarOutlined, ArrowLeftOutlined } from '@ant-design/icons';

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
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <Card
                style={{
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 15,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    border: 'none'
                }}
                bodyStyle={{ padding: 40 }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 30 }}>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/')}
                        style={{
                            position: 'absolute',
                            top: 20,
                            left: 20,
                            color: '#1e3c72'
                        }}
                    >
                        Về trang chủ
                    </Button>
                    
                    <Space direction="vertical" size="small">
                        <CarOutlined style={{ fontSize: 48, color: '#1e3c72' }} />
                        <Title level={2} style={{ margin: 0, color: '#1e3c72' }}>
                            VCar
                        </Title>
                        <Text style={{ color: '#666' }}>
                            Đăng nhập vào hệ thống
                        </Text>
                    </Space>
                </div>

                {/* Login Form */}
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="username"
                        label="Tên đăng nhập hoặc Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên đăng nhập hoặc email!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: '#1e3c72' }} />}
                            placeholder="Nhập tên đăng nhập hoặc email"
                            size="large"
                            style={{ borderRadius: 8 }}
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
                            prefix={<LockOutlined style={{ color: '#1e3c72' }} />}
                            placeholder="Nhập mật khẩu"
                            size="large"
                            style={{ borderRadius: 8 }}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            style={{
                                width: '100%',
                                background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                                borderColor: '#1e3c72',
                                borderRadius: 8,
                                height: 50,
                                fontSize: '1.1rem'
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Space direction="vertical" size="small">
                            <Link to="#" style={{ color: '#1e3c72' }}>
                                Quên mật khẩu?
                            </Link>
                            <Text style={{ color: '#666' }}>
                                Chưa có tài khoản?{' '}
                                <Link to="#" style={{ color: '#1e3c72', fontWeight: 500 }}>
                                    Đăng ký ngay
                                </Link>
                            </Text>
                        </Space>
                    </div>
                </Form>

                {/* Demo accounts */}
                <div style={{ 
                    marginTop: 20, 
                    padding: 15, 
                    background: '#f8f9fa', 
                    borderRadius: 8,
                    border: '1px solid #e9ecef'
                }}>
                    <Text style={{ fontSize: '0.9rem', color: '#666' }}>
                        <strong>Tài khoản demo:</strong><br />
                        • Admin: admin / 123456<br />
                        • Khách hàng: customer@vcar.com / 123456
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default Login;