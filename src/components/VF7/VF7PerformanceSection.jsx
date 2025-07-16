import React from 'react';
import { Section, ContentWrapper } from '../common';
import vf5Image from '../../assets/cars/vf5.webp';
import './VF7PerformanceSection.scss';

const VF7PerformanceSection = () => {
  return (
    <Section className="vf7-performance-section">
      <ContentWrapper>
        <div className="text-content">
          <h3>Hiệu suất vận hành ấn tượng</h3>
          <p>VF7 được trang bị hệ thống động lực điện hiện đại, mang lại khả năng vận hành mạnh mẽ và hiệu quả.</p>
          <div className="performance-stats">
            <div className="stat">
              <span className="number">349</span>
              <span className="unit">HP</span>
              <span className="label">Công suất tối đa</span>
            </div>
            <div className="stat">
              <span className="number">500</span>
              <span className="unit">Nm</span>
              <span className="label">Mô-men xoắn</span>
            </div>
            <div className="stat">
              <span className="number">5.8</span>
              <span className="unit">s</span>
              <span className="label">Tăng tốc 0-100km/h</span>
            </div>
          </div>
        </div>
        <div className="image-content">
          <img src={vf5Image} alt="VF7 Performance" />
        </div>
      </ContentWrapper>
    </Section>
  );
};

export default VF7PerformanceSection; 