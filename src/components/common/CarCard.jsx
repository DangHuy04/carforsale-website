import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBatteryFull, 
  faCar, 
  faUser, 
  faTag,
  faHeart,
  faEye 
} from '@fortawesome/free-solid-svg-icons';
import CustomButton from './CustomButton';
import './CarCard.scss';

const CarCard = ({ 
  car, 
  showPrice = true, 
  showDescription = false,
  showSpecs = true,
  showBadge = true,
  variant = 'default',
  hoverable = true,
  onCardClick,
  onFavoriteClick,
  isFavorite = false,
  className = '' 
}) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(car);
    } else {
      navigate(`/car/${car.id}`);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onFavoriteClick) {
      onFavoriteClick(car);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    }
    return price;
  };

  const getCardClass = () => {
    const baseClass = 'car-card';
    const variantClass = `${baseClass}--${variant}`;
    const hoverClass = hoverable ? `${baseClass}--hoverable` : '';
    
    return `${baseClass} ${variantClass} ${hoverClass} ${className}`.trim();
  };

  const renderBadge = () => {
    if (!showBadge || !car.badge) return null;
    
    const badgeProps = {
      'new': { color: 'green', text: 'Mới' },
      'popular': { color: 'blue', text: 'Phổ biến' },
      'sale': { color: 'red', text: 'Khuyến mãi' },
      'electric': { color: 'cyan', text: 'Điện' }
    };

    const badge = badgeProps[car.badge];
    return badge ? <Badge.Ribbon color={badge.color} text={badge.text} /> : null;
  };

  const renderSpecs = () => {
    if (!showSpecs) return null;

    return (
      <div className="car-specs">
        {car.seatCapacity && (
          <Tooltip title="Số chỗ ngồi">
            <div className="spec-item">
              <FontAwesomeIcon icon={faUser} />
              <span>{car.seatCapacity}</span>
            </div>
          </Tooltip>
        )}
        {car.range && (
          <Tooltip title="Tầm hoạt động">
            <div className="spec-item">
              <FontAwesomeIcon icon={faBatteryFull} />
              <span>{car.range}</span>
            </div>
          </Tooltip>
        )}
        {car.segment && (
          <Tooltip title="Phân khúc">
            <div className="spec-item">
              <FontAwesomeIcon icon={faCar} />
              <span>{car.segment}</span>
            </div>
          </Tooltip>
        )}
      </div>
    );
  };

  const renderActions = () => {
    const actions = [
      <CustomButton 
        key="detail"
        variant="primary"
        size="middle"
        icon={<FontAwesomeIcon icon={faEye} />}
        onClick={handleCardClick}
        fullWidth
      >
        Xem Chi Tiết
      </CustomButton>
    ];

    if (onFavoriteClick) {
      actions.unshift(
        <Tooltip key="favorite" title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}>
          <CustomButton 
            variant="ghost"
            size="middle"
            icon={<FontAwesomeIcon icon={faHeart} className={isFavorite ? 'heart-filled' : 'heart-empty'} />}
            onClick={handleFavoriteClick}
            className={isFavorite ? 'favorite-active' : ''}
          />
        </Tooltip>
      );
    }

    return actions;
  };

  return (
    <Badge.Ribbon {...(renderBadge() ? { color: renderBadge().props.color, text: renderBadge().props.text } : {})}>
      <Card
        className={getCardClass()}
        hoverable={hoverable}
        cover={
          <div className="car-card-image">
            {imageLoading && <div className="image-loading">Đang tải...</div>}
            <img 
              src={car.image} 
              alt={car.name}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
            {imageError && (
              <div className="image-error">
                <FontAwesomeIcon icon={faCar} />
                <span>Không thể tải ảnh</span>
              </div>
            )}
            <div className="image-overlay" onClick={handleCardClick}>
              <FontAwesomeIcon icon={faEye} className="view-icon" />
            </div>
          </div>
        }
        actions={renderActions()}
      >
        <Card.Meta
          title={
            <div className="car-header">
              <h3 className="car-name">{car.name}</h3>
              {car.type && <span className="car-type">{car.type}</span>}
            </div>
          }
          description={
            <div className="car-info">
              {showDescription && car.description && (
                <p className="car-description">{car.description}</p>
              )}
              
              {renderSpecs()}
              
              {showPrice && car.price && (
                <div className="car-price-section">
                  <FontAwesomeIcon icon={faTag} className="price-icon" />
                  <span className="car-price">{formatPrice(car.price)}</span>
                </div>
              )}
            </div>
          }
        />
      </Card>
    </Badge.Ribbon>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    segment: PropTypes.string,
    seatCapacity: PropTypes.number,
    range: PropTypes.string,
    type: PropTypes.string,
    badge: PropTypes.oneOf(['new', 'popular', 'sale', 'electric'])
  }).isRequired,
  showPrice: PropTypes.bool,
  showDescription: PropTypes.bool,
  showSpecs: PropTypes.bool,
  showBadge: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'compact', 'featured']),
  hoverable: PropTypes.bool,
  onCardClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  isFavorite: PropTypes.bool,
  className: PropTypes.string
};

export default CarCard; 