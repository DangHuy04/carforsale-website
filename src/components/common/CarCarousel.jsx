import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './CarCarousel.scss';

const CarCarousel = ({ cars, onSlideChange, showControls = true, autoplay = true }) => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (current, next) => {
    setCurrentSlide(next);
    if (onSlideChange) {
      onSlideChange(next, cars[next]);
    }
  };

  return (
    <div className="car-carousel-container">
      {showControls && (
        <button 
          className="carousel-arrow carousel-arrow-left"
          onClick={() => carouselRef.current?.prev()}
        >
          <LeftOutlined />
        </button>
      )}
      
      <Carousel 
        ref={carouselRef}
        autoplay={autoplay}
        autoplaySpeed={4000}
        dots={false}
        infinite={true}
        fade={true}
        className="car-carousel"
        beforeChange={handleSlideChange}
      >
        {cars.map((car) => (
          <div key={car.id} className="car-slide">
            <div className="car-slide-container">
              <div className="car-image-full">
                <img 
                  src={car.image} 
                  alt={car.title || car.name}
                  className="car-full-image"
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      
      {showControls && (
        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={() => carouselRef.current?.next()}
        >
          <RightOutlined />
        </button>
      )}

      {showControls && (
        <div className="custom-dots">
          {cars.map((_, index) => (
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
      )}
    </div>
  );
};

CarCarousel.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  onSlideChange: PropTypes.func,
  showControls: PropTypes.bool,
  autoplay: PropTypes.bool
};

export default CarCarousel; 