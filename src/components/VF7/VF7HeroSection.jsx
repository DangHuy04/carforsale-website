import React from 'react';
import { Section, SpecsGrid } from '../common';
import vf7Image from '../../assets/cars/vf7.webp';
import './VF7HeroSection.scss';

const VF7HeroSection = () => {
  const heroSpecs = [
    { label: 'Tầm hoạt động', value: '450', unit: 'km' },
    { label: 'Công suất', value: '349', unit: 'hp' },
    { label: 'Mô-men xoắn', value: '500', unit: 'Nm' },
    { label: 'Tăng tốc 0-100km/h', value: '5.8', unit: 's' }
  ];

  return (
    <Section className="vf7-hero-section" containerClass="hero-container">
      <div className="hero-content">
        <h1 className="model-name">VF7</h1>
        <h2 className="tagline">SẢNH ĐIỆU ĐÓT PHÁ</h2>
        <div className="hero-image">
          <img src={vf7Image} alt="VinFast VF7" />
        </div>
        <SpecsGrid specs={heroSpecs} columns={4} className="hero-specs" />
      </div>
    </Section>
  );
};

export default VF7HeroSection; 