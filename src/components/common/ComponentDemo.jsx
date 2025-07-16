import React, { useState } from 'react';
import { 
  CustomButton, 
  CustomInput, 
  CustomSelect, 
  CustomModal, 
  CarCard,
  SpecsGrid,
  DarkModeToggle,
  Section
} from './index';
import { Form, Space, Divider } from 'antd';
import { 
  SearchOutlined, 
  HeartOutlined, 
  CarOutlined, 
  UserOutlined,
  PlusOutlined 
} from '@ant-design/icons';
import './ComponentDemo.scss';

const ComponentDemo = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sample data
  const sampleCar = {
    id: 1,
    name: 'VinFast VF7',
    image: '/assets/cars/vf7.webp',
    price: 999000000,
    description: 'SUV 7 chỗ ngồi sang trọng, hiện đại với công nghệ tiên tiến',
    segment: '7-seat SUV',
    seatCapacity: 7,
    range: '450 km',
    type: 'Điện',
    badge: 'electric'
  };

  const sampleSpecs = [
    { label: 'Tầm hoạt động', value: '450', unit: 'km' },
    { label: 'Công suất', value: '349', unit: 'hp' },
    { label: 'Mô-men xoắn', value: '500', unit: 'Nm' },
    { label: 'Tăng tốc 0-100km/h', value: '5.8', unit: 's' }
  ];

  const selectOptions = [
    { value: 'hanoi', label: 'Hà Nội', icon: <UserOutlined /> },
    { value: 'hcm', label: 'TP. Hồ Chí Minh', icon: <UserOutlined /> },
    { value: 'danang', label: 'Đà Nẵng', icon: <UserOutlined /> }
  ];

  const groupedOptions = [
    {
      label: 'Miền Bắc',
      options: [
        { value: 'hanoi', label: 'Hà Nội' },
        { value: 'haiphong', label: 'Hải Phòng' }
      ]
    },
    {
      label: 'Miền Nam',
      options: [
        { value: 'hcm', label: 'TP. Hồ Chí Minh' },
        { value: 'cantho', label: 'Cần Thơ' }
      ]
    }
  ];

  return (
    <div className={`component-demo ${isDarkMode ? 'dark-mode' : ''}`}>
      <Section>
        <h1>UI Components Demo</h1>
        <DarkModeToggle 
          isDarkMode={isDarkMode} 
          onToggle={() => setIsDarkMode(!isDarkMode)} 
        />
        
        <Divider orientation="left">Buttons</Divider>
        <Space wrap size="middle">
          <CustomButton variant="primary">Primary Button</CustomButton>
          <CustomButton variant="secondary">Secondary Button</CustomButton>
          <CustomButton variant="success">Success Button</CustomButton>
          <CustomButton variant="danger">Danger Button</CustomButton>
          <CustomButton variant="warning">Warning Button</CustomButton>
          <CustomButton variant="ghost">Ghost Button</CustomButton>
          <CustomButton variant="link">Link Button</CustomButton>
          <CustomButton variant="text">Text Button</CustomButton>
        </Space>

        <Space wrap size="middle" style={{ marginTop: 16 }}>
          <CustomButton variant="primary" size="small">Small</CustomButton>
          <CustomButton variant="primary" size="middle">Middle</CustomButton>
          <CustomButton variant="primary" size="large">Large</CustomButton>
          <CustomButton variant="primary" loading>Loading</CustomButton>
          <CustomButton variant="primary" gradient>Gradient</CustomButton>
          <CustomButton variant="primary" rounded>Rounded</CustomButton>
          <CustomButton variant="primary" icon={<PlusOutlined />}>With Icon</CustomButton>
          <CustomButton variant="primary" icon={<SearchOutlined />} iconPosition="right">Icon Right</CustomButton>
        </Space>

        <Divider orientation="left">Inputs</Divider>
        <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
          <CustomInput
            name="text"
            label="Text Input"
            placeholder="Nhập text"
            helpText="Đây là text input cơ bản"
          />
          
          <CustomInput
            name="email"
            label="Email Input"
            type="email"
            placeholder="Nhập email"
            icon={<UserOutlined />}
            required
          />
          
          <CustomInput
            name="password"
            label="Password Input"
            type="password"
            placeholder="Nhập mật khẩu"
            required
          />
          
          <CustomInput
            name="phone"
            label="Phone Input"
            type="phone"
            placeholder="Nhập số điện thoại"
            variant="filled"
          />
          
          <CustomInput
            name="textarea"
            label="Textarea"
            type="textarea"
            placeholder="Nhập mô tả"
            rows={4}
            showCount
            maxLength={100}
            variant="borderless"
          />
        </Form>

        <Divider orientation="left">Select</Divider>
        <Space direction="vertical" size="middle" style={{ width: '100%', maxWidth: 600 }}>
          <CustomSelect
            placeholder="Chọn thành phố"
            options={selectOptions}
            allowClear
          />
          
          <CustomSelect
            placeholder="Chọn nhiều thành phố"
            options={selectOptions}
            mode="multiple"
            showSearch
          />
          
          <CustomSelect
            placeholder="Chọn theo nhóm"
            options={groupedOptions}
            grouped
            variant="filled"
          />
        </Space>

        <Divider orientation="left">Modal</Divider>
        <Space wrap>
          <CustomButton 
            variant="primary" 
            onClick={() => setModalVisible(true)}
          >
            Open Modal
          </CustomButton>
          
          <CustomButton 
            variant="secondary" 
            onClick={() => CustomModal.confirm({
              title: 'Xác nhận',
              content: 'Bạn có chắc chắn muốn thực hiện hành động này?'
            })}
          >
            Confirm Modal
          </CustomButton>
          
          <CustomButton 
            variant="success" 
            onClick={() => CustomModal.success({
              title: 'Thành công',
              content: 'Hành động đã được thực hiện thành công!'
            })}
          >
            Success Modal
          </CustomButton>
          
          <CustomButton 
            variant="danger" 
            onClick={() => CustomModal.error({
              title: 'Lỗi',
              content: 'Đã xảy ra lỗi khi thực hiện hành động!'
            })}
          >
            Error Modal
          </CustomButton>
        </Space>

        <CustomModal
          visible={modalVisible}
          title="Demo Modal"
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
          size="large"
        >
          <div>
            <h3>Nội dung Modal</h3>
            <p>Đây là nội dung bên trong modal. Bạn có thể đặt bất kỳ component nào ở đây.</p>
            <CustomInput 
              placeholder="Input trong modal" 
              style={{ marginBottom: 16 }}
            />
            <CustomSelect
              placeholder="Select trong modal"
              options={selectOptions}
              style={{ width: '100%' }}
            />
          </div>
        </CustomModal>

        <Divider orientation="left">Car Card</Divider>
        <div style={{ maxWidth: 400 }}>
          <CarCard
            car={sampleCar}
            onFavoriteClick={(car) => console.log('Favorite clicked:', car)}
            showSpecs
            showDescription
            variant="featured"
          />
        </div>

        <Divider orientation="left">Specs Grid</Divider>
        <SpecsGrid specs={sampleSpecs} columns={4} />

      </Section>
    </div>
  );
};

export default ComponentDemo; 