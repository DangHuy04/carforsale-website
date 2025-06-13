import React, { useRef, useState } from 'react';
import ChatBot from '../ChatBot/ChatBot';
import { Typography, Button, Row, Col, Card, Space, Carousel } from 'antd';
import { PlayCircleOutlined, ArrowRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Navbar from '../Navbar/Navbar';
import heroVideo from '../../assets/mix.mp4';

// Import ảnh từ assets
import ecvan02Image from '../../assets/cars/ecvan-02.webp';
import minioImage from '../../assets/cars/minio-green.webp';
import herioImage from '../../assets/cars/herio-green.webp';
import nerioImage from '../../assets/cars/nerio-green.webp';
import limoImage from '../../assets/cars/limo-green.webp';
import vf3Image from '../../assets/cars/vf3.webp';
import vf5Image from '../../assets/cars/vf5.webp';
import vf6Image from '../../assets/cars/vf6.webp';
import vf7Image from '../../assets/cars/vf7.webp';
import vf8Image from '../../assets/cars/vf8.webp';
import vf9Image from '../../assets/cars/vf9.webp';

import './Home.scss';

const { Title, Text, Paragraph } = Typography;

const Home = () => {
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Data cho carousel xe đơn giản (từ ecvan-02 đến vf9)
    const carModels = [
        {
            id: 1,
            name: 'ECVAN 02',
            title: 'ECVAN 02',
            image: ecvan02Image,
            segment: 'Commercial Van',
            seatCapacity: 2,
            range: '200 km',
            price: '550.000.000 VND'
        },
        {
            id: 2,
            name: 'MINIO GREEN',
            title: 'MINIO GREEN',
            image: minioImage,
            segment: 'MiniCar',
            seatCapacity: 4,
            range: '170 km',
            price: '269.000.000 VND'
        },
        {
            id: 3,
            name: 'HERIO GREEN',
            title: 'HERIO GREEN',
            image: herioImage,
            segment: 'Compact Car',
            seatCapacity: 4,
            range: '220 km',
            price: '320.000.000 VND'
        },
        {
            id: 4,
            name: 'NERIO GREEN', 
            title: 'NERIO GREEN',
            image: nerioImage,
            segment: 'Mid-size Car',
            seatCapacity: 5,
            range: '280 km',
            price: '420.000.000 VND'
        },
        {
            id: 5,
            name: 'LIMO GREEN',
            title: 'LIMO GREEN',
            image: limoImage,
            segment: 'Luxury Sedan',
            seatCapacity: 5,
            range: '350 km',
            price: '850.000.000 VND'
        },
        {
            id: 6,
            name: 'VF 3',
            title: 'VF 3',
            image: vf3Image,
            segment: 'MiniCar',
            seatCapacity: 4,
            range: '240 km',
            price: '240.000.000 VND'
        },
        {
            id: 7,
            name: 'VF 5',
            title: 'VF 5',
            image: vf5Image,
            segment: 'Small SUV',
            seatCapacity: 5,
            range: '300 km',
            price: '458.000.000 VND'
        },
        {
            id: 8,
            name: 'VF 6',
            title: 'VF 6',
            image: vf6Image,
            segment: 'Mid-size SUV',
            seatCapacity: 5,
            range: '380 km',
            price: '765.000.000 VND'
        },
        {
            id: 9,
            name: 'VF 7',
            title: 'VF 7',
            image: vf7Image,
            segment: '7-seat SUV',
            seatCapacity: 7,
            range: '450 km',
            price: '999.000.000 VND'
        },
        {
            id: 10,
            name: 'VF 8',
            title: 'VF 8',
            image: vf8Image,
            segment: 'Premium SUV',
            seatCapacity: 5,
            range: '420 km',
            price: '1.200.000.000 VND'
        },
        {
            id: 11,
            name: 'VF 9',
            title: 'VF 9',
            image: vf9Image,
            segment: 'Luxury SUV',
            seatCapacity: 7,
            range: '500 km',
            price: '1.500.000.000 VND'
        }
    ];

    const vinfastModels = [
        {
            name: 'VF 3',
            type: 'Điện',
            description: 'Xe điện nhỏ gọn, thông minh: 4 cửa, 4 chỗ ngồi, phù hợp di chuyển trong thành phố.',
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&crop=center',
            category: 'Hatchback',
            price: 'Từ 240 triệu VNĐ'
        },
        {
            name: 'VF 5', 
            type: 'Điện',
            description: 'SUV cỡ nhỏ năng động: 4 cửa, 5 chỗ ngồi, thiết kế trẻ trung hiện đại.',
            image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&crop=center',
            category: 'SUV',
            price: 'Từ 458 triệu VNĐ'
        },
        {
            name: 'VF 6',
            type: 'Điện',
            description: 'SUV cỡ C premium: 4 cửa, 5 chỗ ngồi, trang bị công nghệ tiên tiến.',
            image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop&crop=center',
            category: 'SUV',
            price: 'Từ 765 triệu VNĐ'
        },
        {
            name: 'VF 7',
            type: 'Điện',
            description: 'SUV cỡ D sang trọng: 4 cửa, 7 chỗ ngồi, không gian rộng rãi thoải mái.',
            image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop&crop=center',
            category: 'SUV',
            price: 'Từ 999 triệu VNĐ'
        },
        {
            name: 'VF 8',
            type: 'Điện',
            description: 'SUV cỡ E cao cấp: 4 cửa, 5 chỗ ngồi, hiệu năng mạnh mẽ và tiết kiệm.',
            image: 'https://images.unsplash.com/photo-1617886322207-57be12e32d7b?w=600&h=400&fit=crop&crop=center',
            category: 'SUV',
            price: 'Từ 1.2 tỷ VNĐ'
        },
        {
            name: 'VF 9',
            type: 'Điện',
            description: 'SUV cỡ lớn đẳng cấp: 4 cửa, 7 chỗ ngồi, thiết kế sang trọng bậc nhất.',
            image: 'https://images.unsplash.com/photo-1494976880122-d30c4c3e0df5?w=600&h=400&fit=crop&crop=center',
            category: 'SUV',
            price: 'Từ 1.5 tỷ VNĐ'
        }
    ];

    const discoverImages = [
        {
            title: 'Tương Lai Xanh',
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center',
            description: 'Khám phá tương lai di chuyển bền vững với xe điện VinFast'
        },
        {
            title: 'Phiêu Lưu Không Giới Hạn',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&crop=center',
            description: 'Cùng VinFast khám phá những hành trình đáng nhớ'
        },
        {
            title: 'Nghệ Thuật Chế Tạo',
            image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&crop=center',
            description: 'Khám phá nghệ thuật chế tạo xe tinh xảo của VinFast'
        }
    ];

    return (
        <div className="vinfast-home">
            <Navbar />
            
            {/* Hero Section - VinFast Electric Revolution */}
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-overlay">
                        <Space direction="vertical" size="middle" className="hero-text">
                            <Title level={1} className="hero-title">
                                VinFast: Mãnh liệt tinh thần Việt Nam
                            </Title>
                                <Button
                                    type="primary"
                                    size="large"
                                icon={<PlayCircleOutlined />}
                                className="hero-button"
                            >
                                Khám phá ngay
                            </Button>
                        </Space>
                    </div>
                </div>
                <div className="hero-video">
                    <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="hero-video-element"
                    >
                        <source src={heroVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            {/* Car Models Carousel */}
            <div className="car-models-carousel">
                <div className="carousel-container">
                    <button 
                        className="carousel-arrow carousel-arrow-left"
                        onClick={() => carouselRef.current?.prev()}
                    >
                        <LeftOutlined />
                    </button>
                    
                    <Carousel 
                        ref={carouselRef}
                        autoplay
                        autoplaySpeed={4000}
                        dots={false}
                        infinite={true}
                        fade={true}
                        className="car-carousel"
                        beforeChange={(current, next) => setCurrentSlide(next)}
                    >
                        {carModels.map((car) => (
                            <div key={car.id} className="car-slide">
                                <div className="car-slide-container">
                                    <div className="car-image-full">
                                        <img 
                                            src={car.image} 
                                            alt={car.title}
                                            className="car-full-image"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                    
                    <button 
                        className="carousel-arrow carousel-arrow-right"
                        onClick={() => carouselRef.current?.next()}
                    >
                        <RightOutlined />
                    </button>
                </div>
            </div>

            {/* Car Specifications Section */}
            <div className="car-specifications">
                <div className="container">
                    <div className="divider-line"></div>
                    <div className="specs-content">
                        <Row gutter={[24, 16]} align="middle">
                            <Col xs={24} sm={6}>
                                <div className="spec-item">
                                    <div className="spec-label">Dòng xe</div>
                                    <div className="spec-value">{carModels[currentSlide]?.segment}</div>
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className="spec-item">
                                    <div className="spec-label">Số chỗ ngồi</div>
                                    <div className="spec-value">{carModels[currentSlide]?.seatCapacity} chỗ</div>
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className="spec-item">
                                    <div className="spec-label">Quãng đường lên tới</div>
                                    <div className="spec-value">{carModels[currentSlide]?.range} (NEDC)</div>
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className="spec-item">
                                    <div className="spec-label">Giá từ</div>
                                    <div className="spec-value price">{carModels[currentSlide]?.price}</div>
                                </div>
                            </Col>
                        </Row>
                        <div className="action-buttons">
                            <Button type="primary" size="large" className="order-btn">
                                ĐẶT CỌC
                            </Button>
                            <Button size="large" className="details-btn">
                                XEM CHI TIẾT
                                </Button>
                        </div>
                        <div className="custom-dots">
                            {carModels.map((_, index) => (
                                <button
                                    key={index}
                                    className={`custom-dot ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => {
                                        setCurrentSlide(index);
                                        carouselRef.current?.goTo(index);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* VinFast Innovation Section */}
            <div className="anniversary-section">
                <Row align="middle">
                    <Col xs={24} md={12}>
                        <div className="anniversary-content">
                            <Title level={2}>Khởi Nguồn Từ Tầm Nhìn Việt Nam.</Title>
                            <Paragraph>
                                VinFast - Thương hiệu ô tô điện đầu tiên của Việt Nam, mang công nghệ tiên tiến đến với mọi gia đình.
                            </Paragraph>
                            <Button type="primary" size="large" className="discover-button">
                                Khám Phá Ngay
                                </Button>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="anniversary-image">
                            <img 
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center" 
                                alt="VinFast Innovation Technology"
                            />
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Your VinFast Journey Section */}
            <div className="journey-section">
                <div className="container">
                    <Title level={2} className="section-title">Hành Trình VinFast Của Bạn Bắt Đầu Từ Đây.</Title>
                    <Row gutter={[32, 32]}>
                        {vinfastModels.map((model, index) => (
                            <Col xs={24} sm={12} lg={8} key={index}>
                                <Card
                                    hoverable
                                    className="model-card"
                                    cover={
                                        <div className="model-image">
                                            <img
                                                alt={model.name}
                                                src={model.image}
                                            />
                                            <div className="model-type-badge">
                                                {model.type}
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="model-content">
                                        <Title level={3} className="model-name">{model.name}</Title>
                                        <Text className="model-description">{model.description}</Text>
                                        <div className="model-price">
                                            <Text strong style={{ color: '#1e3a5f', fontSize: '16px' }}>
                                                {model.price}
                                        </Text>
                                        </div>
                                        <Button 
                                            type="link" 
                                            className="explore-button"
                                            icon={<ArrowRightOutlined />}
                                        >
                                            Khám Phá
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Discover Section */}
            <div className="discover-section">
                <div className="container">
                    <Title level={2} className="section-title">Khám Phá VinFast</Title>
                    <Row gutter={[32, 32]}>
                        {discoverImages.map((item, index) => (
                            <Col xs={24} md={8} key={index}>
                                <div className="discover-item">
                                    <div className="discover-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="discover-content">
                                        <Title level={4}>{item.title}</Title>
                                        <Text>{item.description}</Text>
                                    </div>
                                        </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <div className="container">
                    <Row>
                        <Col span={24}>
                            <div className="footer-content">
                                <Title level={3} className="footer-title">VinFast Việt Nam</Title>
                                <Text className="footer-text">
                                    © 2024 VinFast Trading and Investment LLC. Tất cả quyền được bảo lưu.
                    </Text>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* ChatBot Component - Thêm vào cuối */}
            <ChatBot />
        </div>
    );
};

export default Home;