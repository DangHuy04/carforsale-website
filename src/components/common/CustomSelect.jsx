import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './CustomSelect.scss';

const { Option, OptGroup } = Select;

const CustomSelect = ({
  name,
  label,
  placeholder = 'Chọn...',
  options = [],
  grouped = false,
  rules = [],
  required = false,
  size = 'large',
  disabled = false,
  loading = false,
  showSearch = false,
  allowClear = false,
  mode, // 'multiple' | 'tags'
  variant = 'default',
  helpText,
  className = '',
  onChange,
  onSearch,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const defaultRules = required ? [{ required: true, message: `Vui lòng chọn ${label?.toLowerCase()}!` }] : [];

  const getSelectClass = () => {
    const baseClass = 'custom-select';
    const variantClass = `${baseClass}--${variant}`;
    const focusClass = focused ? `${baseClass}--focused` : '';
    
    return `${baseClass} ${variantClass} ${focusClass} ${className}`.trim();
  };

  const renderOptions = () => {
    if (grouped) {
      return options.map((group, index) => (
        <OptGroup key={index} label={group.label}>
          {group.options.map((option) => (
            <Option key={option.value} value={option.value} disabled={option.disabled}>
              {option.icon && <span className="option-icon">{option.icon}</span>}
              {option.label}
            </Option>
          ))}
        </OptGroup>
      ));
    }

    return options.map((option) => (
      <Option key={option.value} value={option.value} disabled={option.disabled}>
        {option.icon && <span className="option-icon">{option.icon}</span>}
        {option.label}
      </Option>
    ));
  };

  const selectProps = {
    placeholder,
    size,
    disabled,
    loading,
    showSearch,
    allowClear,
    mode,
    className: getSelectClass(),
    suffixIcon: <DownOutlined />,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange,
    onSearch,
    filterOption: showSearch ? (input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : undefined,
    ...props
  };

  // If no form context, render standalone select
  if (!name) {
    return (
      <div className="custom-select-wrapper">
        {label && <label className="custom-select-label">{label}</label>}
        <Select {...selectProps}>
          {renderOptions()}
        </Select>
        {helpText && <div className="custom-select-help">{helpText}</div>}
      </div>
    );
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[...defaultRules, ...rules]}
      className="custom-form-item"
      help={helpText}
    >
      <Select {...selectProps}>
        {renderOptions()}
      </Select>
    </Form.Item>
  );
};

CustomSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        icon: PropTypes.node
      }),
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
            icon: PropTypes.node
          })
        ).isRequired
      })
    ])
  ).isRequired,
  grouped: PropTypes.bool,
  rules: PropTypes.array,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  showSearch: PropTypes.bool,
  allowClear: PropTypes.bool,
  mode: PropTypes.oneOf(['multiple', 'tags']),
  variant: PropTypes.oneOf(['default', 'filled', 'borderless']),
  helpText: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func
};

export default CustomSelect; 