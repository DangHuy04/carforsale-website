import React from 'react';
import PropTypes from 'prop-types';
import './SpecsGrid.scss';

const SpecsGrid = ({ specs, columns = 4, className = '' }) => {
  return (
    <div className={`specs-grid cols-${columns} ${className}`}>
      {specs.map((spec, index) => (
        <div key={index} className="spec-item">
          <span className="spec-label">{spec.label}</span>
          <span className="spec-value">{spec.value}</span>
          {spec.unit && <span className="spec-unit">{spec.unit}</span>}
        </div>
      ))}
    </div>
  );
};

SpecsGrid.propTypes = {
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      unit: PropTypes.string
    })
  ).isRequired,
  columns: PropTypes.number,
  className: PropTypes.string
};

export default SpecsGrid; 