import React from 'react';
import { Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './CarOverview.scss';

const { Title, Paragraph } = Typography;

const CarOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="car-overview">
      <div className="overview-container">
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          className="back-btn"
        >
          Về trang chủ
        </Button>
        
        <div className="overview-content">
          <Title level={1}>VinFast VF9 - Tổng quan</Title>
          <Paragraph>
            Đây là trang tổng quan chi tiết về VinFast VF9. 
            Bạn sẽ thiết kế nội dung cho trang này sau.
          </Paragraph>
          
          <div className="placeholder-content">
            <Title level={2}>Nội dung sẽ được thiết kế</Title>
            <ul>
              <li>Thông số kỹ thuật chi tiết</li>
              <li>Hình ảnh và video</li>
              <li>So sánh với các dòng xe khác</li>
              <li>Đánh giá và review</li>
              <li>Thông tin bảo hành</li>
            </ul>
          </div>

          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate('/car/vf9')}
            style={{ marginTop: '20px' }}
          >
            Đặt cọc ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarOverview; 