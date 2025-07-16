import React from 'react';
import PropTypes from 'prop-types';
import { Section, ContentWrapper } from '../common';
import './VF7FeatureSection.scss';

const VF7FeatureSection = ({ 
  title, 
  description, 
  image, 
  features, 
  reverse = false, 
  background = 'default',
  className = '' 
}) => {
  return (
    <Section className={`vf7-feature-section ${className}`} background={background}>
      <ContentWrapper reverse={reverse}>
        <div className="text-content">
          <h3>{title}</h3>
          <p>{description}</p>
          {features && (
            <div className="features-list">
              {Array.isArray(features) ? (
                <ul>
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <div className="custom-features">
                  {features}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="image-content">
          <img src={image} alt={title} />
        </div>
      </ContentWrapper>
    </Section>
  );
};

VF7FeatureSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  features: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.node
  ]),
  reverse: PropTypes.bool,
  background: PropTypes.string,
  className: PropTypes.string
};

export default VF7FeatureSection; 