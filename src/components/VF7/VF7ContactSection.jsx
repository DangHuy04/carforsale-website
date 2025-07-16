import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Select, Form } from 'antd';
import { Section } from '../common';
import vf7Image from '../../assets/cars/vf7.webp';
import './VF7ContactSection.scss';

const { Option } = Select;

const VF7ContactSection = ({ form, onFormSubmit }) => {
  return (
    <Section className="vf7-contact-section">
      <div className="contact-content">
        <div className="contact-text">
          <h3>Đăng ký lái thử</h3>
          <p>Trải nghiệm VF7 ngay hôm nay và cảm nhận sự khác biệt.</p>
        </div>
        <div className="contact-form">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFormSubmit}
            className="registration-form"
          >
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="city"
              label="Tỉnh/Thành phố"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
            >
              <Select placeholder="Chọn tỉnh/thành phố">
                <Option value="hanoi">Hà Nội</Option>
                <Option value="hcm">TP. Hồ Chí Minh</Option>
                <Option value="danang">Đà Nẵng</Option>
                <Option value="haiphong">Hải Phòng</Option>
                <Option value="cantho">Cần Thơ</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Đăng ký lái thử
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="contact-image">
        <img src={vf7Image} alt="VF7 Contact" />
      </div>
    </Section>
  );
};

VF7ContactSection.propTypes = {
  form: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default VF7ContactSection; 