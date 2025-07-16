import React from 'react';
import { Section } from '../common';
import './VF7SpecificationsSection.scss';

const VF7SpecificationsSection = () => {
  const specCategories = [
    {
      title: 'Kích thước',
      specs: [
        { name: 'Dài x Rộng x Cao', detail: '4973 x 1962 x 1694 mm' },
        { name: 'Chiều dài cơ sở', detail: '2950 mm' },
        { name: 'Khoảng sáng gầm xe', detail: '175 mm' }
      ]
    },
    {
      title: 'Động cơ',
      specs: [
        { name: 'Loại động cơ', detail: 'Điện' },
        { name: 'Công suất tối đa', detail: '349 HP' },
        { name: 'Mô-men xoắn', detail: '500 Nm' }
      ]
    },
    {
      title: 'Pin và Sạc',
      specs: [
        { name: 'Dung lượng pin', detail: '75.3 kWh' },
        { name: 'Tầm hoạt động', detail: '450 km' },
        { name: 'Thời gian sạc nhanh', detail: '31 phút (10-70%)' }
      ]
    }
  ];

  return (
    <Section className="vf7-specifications-section">
      <h3>Thông số kỹ thuật</h3>
      <div className="specs-table">
        {specCategories.map((category, index) => (
          <div key={index} className="spec-category">
            <h4>{category.title}</h4>
            {category.specs.map((spec, specIndex) => (
              <div key={specIndex} className="spec-row">
                <span className="spec-name">{spec.name}</span>
                <span className="spec-detail">{spec.detail}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default VF7SpecificationsSection; 