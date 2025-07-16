import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { 
  VF7Header, 
  VF7HeroSection, 
  VF7VideoSection, 
  VF7PerformanceSection,
  VF7FeatureSection,
  VF7SpecificationsSection,
  VF7ContactSection 
} from '../VF7';
import { Section } from '../common';
import './VF7Detail.scss';

// Import images
import vf8Image from '../../assets/cars/vf8.webp';
import vf9Image from '../../assets/cars/vf9.webp';
import ecvan02Image from '../../assets/cars/ecvan-02.webp';
import herioImage from '../../assets/cars/herio-green.webp';
import logoVinFast from '../../assets/logov.svg';

const VF7Detail = () => {
  const [form] = Form.useForm();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
    message.success('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất.');
    form.resetFields();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme to body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  // Features data for different sections
  const exteriorFeatures = [
    'Lưới tản nhiệt Infinity mang tính biểu tượng',
    'Đèn LED ma trận thông minh',
    'Cửa sổ trời toàn cảnh',
    'La-zăng hợp kim 20 inch'
  ];

  const interiorFeatures = (
    <div className="interior-features">
      <div className="feature">
        <h4>Ghế ngồi cao cấp</h4>
        <p>Da Nappa cao cấp với 8 hướng chỉnh điện</p>
      </div>
      <div className="feature">
        <h4>Không gian rộng rãi</h4>
        <p>7 chỗ ngồi linh hoạt với khoang hành lý 1610L</p>
      </div>
    </div>
  );

  const technologyFeatures = (
    <div className="tech-features">
      <div className="tech-item">
        <span className="tech-icon">📱</span>
        <span className="tech-name">Màn hình cảm ứng 15.6"</span>
      </div>
      <div className="tech-item">
        <span className="tech-icon">🔊</span>
        <span className="tech-name">Hệ thống âm thanh 13 loa</span>
      </div>
      <div className="tech-item">
        <span className="tech-icon">🚗</span>
        <span className="tech-name">VinFast ADAS Level 2</span>
      </div>
    </div>
  );

  const connectivityFeatures = [
    'Cập nhật phần mềm OTA',
    'Điều khiển từ xa qua ứng dụng',
    'Tích hợp VinFast Smart Services',
    'Hỗ trợ 5G và WiFi'
  ];

  return (
    <div className={`vf7-detail ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <VF7Header 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={toggleDarkMode} 
      />
      
      <VF7HeroSection />
      <VF7VideoSection />
      <VF7PerformanceSection />

      <VF7FeatureSection
        title="Thiết kế ngoại thất đầy cảm hứng"
        description="VF7 thể hiện triết lý thiết kế 'Global - Tinh tế - Năng động' với những đường nét sang trọng và hiện đại."
        image={vf8Image}
        features={exteriorFeatures}
        reverse={true}
        background="light"
      />

      <Section className="concept-section" background="dark">
        <div className="concept-content">
          <h3>Thiết kế tiên phong</h3>
          <div className="concept-image">
            <img src={vf9Image} alt="VF7 Concept" />
          </div>
          <p>VF7 được thiết kế dựa trên ngôn ngữ thiết kế "Golden Ratio" tạo nên sự cân bằng hoàn hảo.</p>
        </div>
      </Section>

      <VF7FeatureSection
        title="Nội thất cao cấp"
        description="Không gian nội thất được thiết kế tối ưu với chất liệu cao cấp và công nghệ hiện đại."
        image={ecvan02Image}
        features={interiorFeatures}
        background="light"
      />

      <VF7FeatureSection
        title="Công nghệ thông minh"
        description="VF7 tích hợp hệ thống thông tin giải trí và hỗ trợ lái xe thông minh hàng đầu."
        image={herioImage}
        features={technologyFeatures}
        reverse={true}
        background="dark"
        className="technology-section"
             />

      <Section className="charging-section" background="dark">
        <h3>Hệ thống sạc đa dạng và tiện lợi</h3>
        <div className="charging-grid">
          <div className="charging-item">
            <div className="charging-icon">⚡</div>
            <h4>Sạc nhanh DC</h4>
            <p>Sạc từ 10% đến 70% chỉ trong 31 phút</p>
          </div>
          <div className="charging-item">
            <div className="charging-icon">🏠</div>
            <h4>Sạc tại nhà</h4>
            <p>Sạc đầy pin trong 9.5 giờ với sạc AC 7.4kW</p>
          </div>
          <div className="charging-item">
            <div className="charging-icon">🗺️</div>
            <h4>Mạng lưới sạc</h4>
            <p>Hơn 150.000 điểm sạc trên toàn quốc</p>
          </div>
        </div>
      </Section>

      <VF7FeatureSection
        title="Kết nối thông minh"
        description="VF7 được tích hợp hệ sinh thái VinFast với khả năng kết nối vượt trội."
        image={logoVinFast}
        features={connectivityFeatures}
        background="light"
        className="connectivity-section"
      />

      <VF7SpecificationsSection />

      <VF7ContactSection 
        form={form} 
        onFormSubmit={handleFormSubmit} 
      />
    </div>
  );
};

export default VF7Detail; 