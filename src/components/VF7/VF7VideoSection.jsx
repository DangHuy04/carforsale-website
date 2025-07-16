import React from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Section } from '../common';
import vf6Image from '../../assets/cars/vf6.webp';
import './VF7VideoSection.scss';

const VF7VideoSection = () => {
  return (
    <Section className="vf7-video-section">
      <div className="video-content">
        <h3>VF7 với thiết kế táo bạo thể hiện sự tự tin</h3>
        <div className="video-wrapper">
          <img src={vf6Image} alt="VF7 Video Thumbnail" />
          <div className="play-button">
            <PlayCircleOutlined />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default VF7VideoSection; 