import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from './CustomButton';
import './CustomModal.scss';

const CustomModal = ({
  visible = false,
  title,
  children,
  onOk,
  onCancel,
  okText = 'Đồng ý',
  cancelText = 'Hủy bỏ',
  okButtonProps = {},
  cancelButtonProps = {},
  confirmLoading = false,
  size = 'default',
  centered = true,
  closable = true,
  maskClosable = true,
  keyboard = true,
  footer = undefined,
  customFooter = false,
  className = '',
  destroyOnClose = false,
  zIndex = 1000,
  bodyStyle = {},
  ...props
}) => {
  const getModalClass = () => {
    const baseClass = 'custom-modal';
    const sizeClass = `${baseClass}--${size}`;
    
    return `${baseClass} ${sizeClass} ${className}`.trim();
  };

  const getWidth = () => {
    switch (size) {
      case 'small': return 400;
      case 'large': return 800;
      case 'extra-large': return 1200;
      default: return 520;
    }
  };

  const renderFooter = () => {
    if (footer === null) return null;
    if (footer !== undefined) return footer;
    if (customFooter) return null;

    return [
      <CustomButton
        key="cancel"
        variant="secondary"
        onClick={onCancel}
        {...cancelButtonProps}
      >
        {cancelText}
      </CustomButton>,
      <CustomButton
        key="ok"
        variant="primary"
        loading={confirmLoading}
        onClick={onOk}
        {...okButtonProps}
      >
        {okText}
      </CustomButton>
    ];
  };

  return (
    <Modal
      open={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      footer={renderFooter()}
      confirmLoading={confirmLoading}
      centered={centered}
      closable={closable}
      maskClosable={maskClosable}
      keyboard={keyboard}
      className={getModalClass()}
      width={getWidth()}
      destroyOnClose={destroyOnClose}
      zIndex={zIndex}
      bodyStyle={bodyStyle}
      closeIcon={<CloseOutlined />}
      {...props}
    >
      <div className="custom-modal-content">
        {children}
      </div>
    </Modal>
  );
};

// Static methods for quick modals
CustomModal.confirm = (config) => {
  return Modal.confirm({
    className: 'custom-modal custom-modal--confirm',
    centered: true,
    okText: 'Đồng ý',
    cancelText: 'Hủy bỏ',
    ...config
  });
};

CustomModal.success = (config) => {
  return Modal.success({
    className: 'custom-modal custom-modal--success',
    centered: true,
    okText: 'Đóng',
    ...config
  });
};

CustomModal.error = (config) => {
  return Modal.error({
    className: 'custom-modal custom-modal--error',
    centered: true,
    okText: 'Đóng',
    ...config
  });
};

CustomModal.warning = (config) => {
  return Modal.warning({
    className: 'custom-modal custom-modal--warning',
    centered: true,
    okText: 'Đóng',
    ...config
  });
};

CustomModal.info = (config) => {
  return Modal.info({
    className: 'custom-modal custom-modal--info',
    centered: true,
    okText: 'Đóng',
    ...config
  });
};

CustomModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  confirmLoading: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large', 'extra-large']),
  centered: PropTypes.bool,
  closable: PropTypes.bool,
  maskClosable: PropTypes.bool,
  keyboard: PropTypes.bool,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  customFooter: PropTypes.bool,
  className: PropTypes.string,
  destroyOnClose: PropTypes.bool,
  zIndex: PropTypes.number,
  bodyStyle: PropTypes.object
};

export default CustomModal; 