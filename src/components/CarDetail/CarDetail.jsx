import React, { useState, useEffect } from 'react';
import { ZoomInOutlined, CheckOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Modal, Radio, Input, Select, Checkbox, message, AutoComplete, Tooltip } from 'antd';
import CarDetailHeader from './CarDetailHeader';
import './CarDetail.scss';

const { Option } = Select;

const CarDetail = () => {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 states
  const [selectedVersion, setSelectedVersion] = useState('eco');
  const [selectedExteriorColor, setSelectedExteriorColor] = useState('infinity-blanc');
  const [selectedInteriorColor, setSelectedInteriorColor] = useState('black');
  const [selectedOptions, setSelectedOptions] = useState({
    sunroof: false,
    awd: false
  });
  
  // Step 2 states - Customer Information
  const [ownerType, setOwnerType] = useState('individual');
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    cccd: '',
    email: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedShowroom, setSelectedShowroom] = useState('');
  const [consultant, setConsultant] = useState('');
  const [isProgramExpanded, setIsProgramExpanded] = useState(false);
  
  // Step 3 states - Payment
  const [isOrderInfoExpanded, setIsOrderInfoExpanded] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('atm');
  const [paymentGateway, setPaymentGateway] = useState('');
  const [termsAccepted, setTermsAccepted] = useState({
    infoConfirm: false,
    termsConditions: false,
    dataPolicy: false,
    vinFastTerms: false
  });
  
  // Animation states for payment gateway
  const [gatewayAnimationState, setGatewayAnimationState] = useState({
    international: 'closed',
    atm: 'closed'
  });
  
  // Initialize animation for default payment method
  useEffect(() => {
    // Set opening animation for default payment method (atm)
    setTimeout(() => {
      setGatewayAnimationState(prev => ({
        ...prev,
        [paymentMethod]: 'opening'
      }));
    }, 500); // Small delay for better UX
  }, []); // Only run on mount
  
  // General states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  // Dữ liệu xe VF7
  const carData = {
    name: 'VinFast VF7',
    versions: {
      eco: {
        name: 'VF 7 Eco',
        price: 499000000
      },
      plus: {
        name: 'VF 7 Plus', 
        price: 550000000
      }
    },
    options: {
      sunroof: {
        name: 'Trần kính toàn cảnh',
        price: 20000000
      },
      awd: {
        name: 'Hai cầu (AWD, 2 động cơ)',
        price: 50000000
      }
    },
    exteriorColors: [
      { id: 'infinity-blanc', name: 'Infinity Blanc', color: '#F8F8FF', price: 0 },
      { id: 'urban-mint', name: 'Urban Mint', color: '#98D8C8', price: 12000000 },
      { id: 'crimson-red', name: 'Crimson Red', color: '#DC143C', price: 0 },
      { id: 'zenith-grey', name: 'Zenith Grey', color: '#708090', price: 0 },
      { id: 'jet-black', name: 'Jet Black', color: '#1C1C1C', price: 0 }
    ],
    interiorColors: [
      { id: 'black', name: 'Black', color: '#1F2937' },
      { id: 'brown', name: 'Mocca Brown', color: '#8B4513' }
    ],
    images: {
      exterior: [
        require('../../assets/cars/vf7.webp'),
        require('../../assets/cars/vf6.webp'),
        require('../../assets/cars/vf5.webp')
      ],
      interior: [
        require('../../assets/cars/vf8.webp'),
        require('../../assets/cars/vf9.webp')
      ]
    },
    colorImages: {
      'infinity-blanc': require('../../assets/cars/vf7/exterior/Infinity Blanc.webp'),
      'urban-mint': require('../../assets/cars/vf7/exterior/Urban Mint.webp'),
      'crimson-red': require('../../assets/cars/vf7/exterior/Crimson Red.webp'),
      'zenith-grey': require('../../assets/cars/vf7/exterior/Zenith Grey.webp'),
      'jet-black': require('../../assets/cars/vf7/exterior/Jet Black.webp')
    },
    interiorImages: {
      'black': [
        require('../../assets/cars/vf7/interior/Black/1.webp'),
        require('../../assets/cars/vf7/interior/Black/2.webp'),
        require('../../assets/cars/vf7/interior/Black/3.webp'),
        require('../../assets/cars/vf7/interior/Black/4.webp'),
        require('../../assets/cars/vf7/interior/Black/5.webp')
      ],
      'brown': [
        require('../../assets/cars/vf7/interior/Mocca Brown/1.webp'),
        require('../../assets/cars/vf7/interior/Mocca Brown/2.webp')
      ]
    }
  };

  // Data for Step 2
  const provinces = [
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'hcm', label: 'TP. Hồ Chí Minh' },
    { value: 'danang', label: 'Đà Nẵng' },
    { value: 'haiphong', label: 'Hải Phòng' },
    { value: 'cantho', label: 'Cần Thơ' }
  ];

  const showrooms = {
    hanoi: [
      { value: 'hanoi-1', label: 'VinFast Hà Nội - Phạm Hùng', address: '123 Phạm Hùng, Nam Từ Liêm, Hà Nội' },
      { value: 'hanoi-2', label: 'VinFast Hà Nội - Lê Văn Lương', address: '456 Lê Văn Lương, Thanh Xuân, Hà Nội' },
      { value: 'hanoi-3', label: 'VinFast Hà Nội - Times City', address: '789 Times City, Hai Bà Trưng, Hà Nội' }
    ],
    hcm: [
      { value: 'hcm-1', label: 'VinFast TP.HCM - Nguyễn Văn Linh', address: '321 Nguyễn Văn Linh, Quận 7, TP.HCM' },
      { value: 'hcm-2', label: 'VinFast TP.HCM - Lê Văn Việt', address: '654 Lê Văn Việt, Quận 9, TP.HCM' },
      { value: 'hcm-3', label: 'VinFast TP.HCM - Quận 1', address: '987 Nguyễn Huệ, Quận 1, TP.HCM' }
    ],
    danang: [
      { value: 'danang-1', label: 'VinFast Đà Nẵng - Nguyễn Văn Linh', address: '147 Nguyễn Văn Linh, Hải Châu, Đà Nẵng' }
    ],
    haiphong: [
      { value: 'haiphong-1', label: 'VinFast Hải Phòng - Lạch Tray', address: '258 Lạch Tray, Ngô Quyền, Hải Phòng' }
    ],
    cantho: [
      { value: 'cantho-1', label: 'VinFast Cần Thơ - 3/2', address: '369 Đường 3/2, Ninh Kiều, Cần Thơ' }
    ]
  };

  const consultants = [
    'Nguyễn Văn An - Chuyên viên tư vấn',
    'Trần Thị Bình - Chuyên viên tư vấn',
    'Lê Hoàng Cường - Trưởng nhóm tư vấn',
    'Phạm Thị Dung - Chuyên viên tư vấn',
    'Hoàng Văn Em - Chuyên viên tư vấn'
  ];

  const programs = [
    {
      id: 'referral',
      label: 'Giới thiệu Khách hàng mới dành cho Cộng tác viên.'
    },
    {
      id: 'vingroup-employee',
      label: 'Chương trình "Mảnh liệt tình thần Việt Nam - CBNV Tập đoàn Vingroup".'
    },
    {
      id: 'partner-program',
      label: 'Tham gia chương trình Đối tác VinFast'
    },
    {
      id: 'online-consultant',
      label: 'Chuyển viên tư vấn trực tuyến'
    },
    {
      id: 'o2o-policy',
      label: 'Chính sách ưu đãi dành cho Khách hàng mua xe ô tô qua kênh O2O.'
    }
  ];

  // Tính tổng giá xe
  const calculateTotalPrice = () => {
    const basePrice = carData.versions[selectedVersion].price;
    const colorPrice = carData.exteriorColors.find(c => c.id === selectedExteriorColor)?.price || 0;
    
    let optionsPrice = 0;
    if (selectedVersion === 'plus') {
      if (selectedOptions.sunroof) {
        optionsPrice += carData.options.sunroof.price;
      }
      if (selectedOptions.awd) {
        optionsPrice += carData.options.awd.price;
      }
    }
    
    return basePrice + colorPrice + optionsPrice;
  };

  // Lấy tất cả ảnh cho lightbox
  const getAllImages = () => {
    const colorImage = carData.colorImages[selectedExteriorColor];
    const interiorImages = carData.interiorImages[selectedInteriorColor] || [];
    const mainImages = colorImage ? [colorImage] : [];
    return [...mainImages, ...interiorImages];
  };

  // Lấy ảnh nội thất theo màu được chọn
  const getInteriorImages = () => {
    return carData.interiorImages[selectedInteriorColor] || [];
  };

  // Lấy ảnh chính dựa trên màu được chọn (bao gồm cả ngoại thất và nội thất)
  const getCurrentMainImage = () => {
    const allAvailableImages = getAllImages();
    return allAvailableImages[currentImageIndex] || carData.images.exterior[0];
  };

  // Lấy tất cả ảnh để hiển thị thumbnail (cả ngoại thất và nội thất)
  const getThumbnailImages = () => {
    return getAllImages();
  };

  // Reset currentImageIndex khi thay đổi màu nội thất
  const handleInteriorColorChange = (colorId) => {
    setSelectedInteriorColor(colorId);
    setCurrentImageIndex(0); // Reset về ảnh đầu tiên
  };

  // Reset currentImageIndex khi thay đổi màu ngoại thất
  const handleExteriorColorChange = (colorId) => {
    setSelectedExteriorColor(colorId);
    setCurrentImageIndex(0); // Reset về ảnh đầu tiên
  };

  // Kiểm tra form bước 1
  const isStep1Valid = () => {
    return selectedVersion && selectedExteriorColor && selectedInteriorColor;
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateField = (field, value) => {
    const errors = { ...validationErrors };

    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          errors.fullName = 'Vui lòng nhập họ và tên';
        } else if (value.length > 80) {
          errors.fullName = 'Họ và tên không được vượt quá 80 ký tự';
        } else {
          delete errors.fullName;
        }
        break;
      
      case 'phone':
        if (!value.trim()) {
          errors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!validatePhone(value)) {
          errors.phone = 'Số điện thoại không hợp lệ (10 chữ số)';
        } else {
          delete errors.phone;
        }
        break;
      
      case 'cccd':
        if (!value.trim()) {
          errors.cccd = 'Vui lòng nhập số CCCD';
        } else if (value.length !== 12) {
          errors.cccd = 'Số CCCD phải có 12 chữ số';
        } else {
          delete errors.cccd;
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          errors.email = 'Vui lòng nhập email';
        } else if (!validateEmail(value)) {
          errors.email = 'Email chưa đúng định dạng';
        } else {
          delete errors.email;
        }
        break;
      
      case 'province':
        if (!value) {
          errors.province = 'Vui lòng chọn tỉnh thành';
        } else {
          delete errors.province;
        }
        break;
      
      case 'showroom':
        if (!value) {
          errors.showroom = 'Vui lòng chọn showroom nhận xe';
        } else {
          delete errors.showroom;
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Kiểm tra form bước 2
  const isStep2Valid = () => {
    const { fullName, phone, cccd, email } = customerInfo;
    
    // Validate all fields
    const isFullNameValid = fullName.trim() && fullName.length <= 80;
    const isPhoneValid = phone.trim() && validatePhone(phone);
    const isCccdValid = cccd.trim() && cccd.length === 12;
    const isEmailValid = email.trim() && validateEmail(email);
    const isProvinceValid = selectedProvince;
    const isShowroomValid = selectedShowroom;

    return isFullNameValid && isPhoneValid && isCccdValid && isEmailValid && isProvinceValid && isShowroomValid;
  };

  // Kiểm tra form bước 3
  const isStep3Valid = () => {
    const allTermsAccepted = Object.values(termsAccepted).every(accepted => accepted);
    const paymentMethodValid = paymentMethod;
    // Nếu chọn ATM hoặc Thẻ quốc tế thì phải chọn gateway, nếu chọn khác thì không cần
    const paymentGatewayValid = (paymentMethod !== 'atm' && paymentMethod !== 'international') || 
                               ((paymentMethod === 'atm' || paymentMethod === 'international') && paymentGateway);
    
    return allTermsAccepted && paymentMethodValid && paymentGatewayValid;
  };

  // Kiểm tra trạng thái form hiện tại
  const isCurrentStepValid = () => {
    if (currentStep === 1) return isStep1Valid();
    if (currentStep === 2) return isStep2Valid();
    if (currentStep === 3) return isStep3Valid();
    return false;
  };

  // Chuyển đến bước tiếp theo
  const handleNextStep = () => {
    if (!isCurrentStepValid()) {
      message.warning('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    if (currentStep === 1) {
      setCurrentStep(2);
      message.success('Chuyển đến bước nhập thông tin!');
    } else if (currentStep === 2) {
      setCurrentStep(3);
      message.success('Chuyển đến bước đặt cọc!');
    }
  };

  // Quay lại bước trước
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Xử lý thay đổi thông tin khách hàng
  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Validate field realtime
    setTimeout(() => {
      validateField(field, value);
    }, 300); // Debounce validation
  };

  // Xử lý thay đổi tỉnh thành
  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedShowroom(''); // Reset showroom when province changes
    validateField('province', value);
    // Also clear showroom validation since it's reset
    validateField('showroom', '');
  };

  // Xử lý thay đổi showroom
  const handleShowroomChange = (value) => {
    setSelectedShowroom(value);
    validateField('showroom', value);
  };

  // Xử lý thay đổi chương trình
  const handleProgramChange = (programId, checked) => {
    if (checked) {
      setSelectedPrograms(prev => [...prev, programId]);
    } else {
      setSelectedPrograms(prev => prev.filter(id => id !== programId));
    }
  };

  // Xử lý thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (value) => {
    const previousMethod = paymentMethod;
    
    // Close previous gateway section with animation
    if (previousMethod === 'international' || previousMethod === 'atm') {
      setGatewayAnimationState(prev => ({
        ...prev,
        [previousMethod]: 'closing'
      }));
      
      // After closing animation, set to closed
      setTimeout(() => {
        setGatewayAnimationState(prev => ({
          ...prev,
          [previousMethod]: 'closed'
        }));
      }, 300);
    }
    
    // Set new payment method
    setPaymentMethod(value);
    
    // Open new gateway section with animation
    if (value === 'international' || value === 'atm') {
      setTimeout(() => {
        setGatewayAnimationState(prev => ({
          ...prev,
          [value]: 'opening'
        }));
      }, previousMethod === 'international' || previousMethod === 'atm' ? 300 : 50);
    }
    
    // Reset gateway if switching to bank transfer
    if (value !== 'atm' && value !== 'international') {
      setPaymentGateway('');
    }
  };

  // Xử lý thay đổi điều khoản
  const handleTermsChange = (field, checked) => {
    setTermsAccepted(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  // Xử lý thanh toán đặt cọc
  const handlePayment = () => {
    if (!isStep3Valid()) {
      message.warning('Vui lòng hoàn tất tất cả thông tin bắt buộc!');
      return;
    }
    
    message.success('Đang chuyển hướng đến cổng thanh toán...');
    // Ở đây sẽ tích hợp với cổng thanh toán thực tế
  };

  const nextImage = () => {
    const allImages = getAllImages();
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    const allImages = getAllImages();
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  const handleVersionChange = (version) => {
    setSelectedVersion(version);
    // Reset options when changing version
    if (version === 'eco') {
      setSelectedOptions({
        sunroof: false,
        awd: false
      });
    }
  };

  const handleOptionChange = (option, checked) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  return (
    <div className="car-detail">
      {/* Header */}
      <CarDetailHeader 
        carName={carData.name}
        carPrice={`${calculateTotalPrice().toLocaleString('vi-VN')} VNĐ`}
      />

      <div className="container">
        {/* Main Content - 2 Columns */}
        <div className="main-content">
          {/* Left Column - Images */}
          <div className="image-section">
            <div className="main-image">
              <img 
                src={getCurrentMainImage()} 
                alt={carData.name}
                onClick={() => setIsLightboxVisible(true)}
              />
              <div className="zoom-indicator" onClick={() => setIsLightboxVisible(true)}>
                <ZoomInOutlined /> Xem ảnh lớn
              </div>
            </div>
            
            <div className="image-thumbnails">
              {getThumbnailImages().length > 0 ? (
                getThumbnailImages().map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt={`${carData.name} ${index === 0 ? 'ngoại thất' : 'nội thất'}`} />
                  </div>
                ))
              ) : (
                <div className="no-images-message">
                  <p>Không có ảnh cho lựa chọn này</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Configuration */}
          <div className="config-section">
            <div className="config-header">
              <h2>{currentStep === 1 ? 'Lựa chọn xe' : currentStep === 2 ? 'Nhập thông tin' : 'Đặt cọc xe'}</h2>
              <div className="steps-progress">
                <div className={`step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
                  <span className="step-number">1</span>
                  <span className="step-title">Lựa chọn xe</span>
                </div>
                <div className={`step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
                  <span className="step-number">2</span>
                  <span className="step-title">Nhập thông tin</span>
                </div>
                <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
                  <span className="step-number">3</span>
                  <span className="step-title">Đặt cọc xe</span>
                </div>
              </div>
            </div>

            {/* Step 1 Content */}
            {currentStep === 1 && (
              <>
                {/* Version Selection */}
                <div className="config-group">
                  <h3>Chọn phiên bản xe</h3>
                  <Radio.Group 
                    value={selectedVersion} 
                    onChange={(e) => handleVersionChange(e.target.value)}
                    className="version-options"
                  >
                    {Object.entries(carData.versions).map(([key, version]) => (
                      <Radio.Button key={key} value={key} className="version-option">
                        <div className="version-info">
                          <span className="version-name">{version.name}</span>
                          <span className="version-price">
                            {version.price.toLocaleString('vi-VN')} VNĐ
                          </span>
                        </div>
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </div>

                {/* VF7 Plus Options */}
                {selectedVersion === 'plus' && (
                  <div className="config-group">
                    <h3>Tùy chọn</h3>
                    <div className="options-list">
                      <div className="option-item">
                        <Checkbox
                          checked={selectedOptions.sunroof}
                          onChange={(e) => handleOptionChange('sunroof', e.target.checked)}
                        >
                          <div className="option-info">
                            <span className="option-name">{carData.options.sunroof.name}</span>
                            <span className="option-price">
                              +{carData.options.sunroof.price.toLocaleString('vi-VN')} VNĐ
                            </span>
                          </div>
                        </Checkbox>
                      </div>
                      <div className="option-item">
                        <Checkbox
                          checked={selectedOptions.awd}
                          onChange={(e) => handleOptionChange('awd', e.target.checked)}
                        >
                          <div className="option-info">
                            <span className="option-name">{carData.options.awd.name}</span>
                            <span className="option-price">
                              +{carData.options.awd.price.toLocaleString('vi-VN')} VNĐ
                            </span>
                          </div>
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                )}

                {/* Exterior Color Selection */}
                <div className="config-group">
                  <h3>Chọn màu ngoại thất</h3>
                  <div className="current-selection">
                    <span>Màu đang chọn: </span>
                    <strong>
                      {carData.exteriorColors.find(c => c.id === selectedExteriorColor)?.name}
                    </strong>
                  </div>
                  <div className="color-options">
                    {carData.exteriorColors.map((color) => (
                      <div 
                        key={color.id}
                        className={`color-option ${selectedExteriorColor === color.id ? 'selected' : ''}`}
                        onClick={() => handleExteriorColorChange(color.id)}
                      >
                        <div 
                          className="color-circle"
                          style={{ backgroundColor: color.color }}
                        />
                        <div className="color-info">
                          <span className="color-name">{color.name}</span>
                          {color.price > 0 && (
                            <span className="color-price">
                              +{color.price.toLocaleString('vi-VN')} VNĐ
                            </span>
                          )}
                        </div>
                        {selectedExteriorColor === color.id && (
                          <CheckOutlined className="check-icon" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interior Color Selection */}
                <div className="config-group">
                  <h3>Chọn màu nội thất</h3>
                  <div className="current-selection">
                    <span>Màu đang chọn: </span>
                    <strong>
                      {carData.interiorColors.find(c => c.id === selectedInteriorColor)?.name}
                    </strong>
                  </div>
                  <div className="color-options">
                    {carData.interiorColors.map((color) => (
                      <div 
                        key={color.id}
                        className={`color-option ${selectedInteriorColor === color.id ? 'selected' : ''}`}
                        onClick={() => handleInteriorColorChange(color.id)}
                      >
                        <div 
                          className="color-circle"
                          style={{ backgroundColor: color.color }}
                        />
                        <span className="color-name">{color.name}</span>
                        {selectedInteriorColor === color.id && (
                          <CheckOutlined className="check-icon" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="price-summary">
                  <h3>Tóm tắt giá</h3>
                  <div className="summary-items">
                    <div className="summary-item">
                      <span className="summary-label">{carData.name} Giá xe cơ bản</span>
                      <span className="summary-value">{carData.versions[selectedVersion].price.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    
                    <div className="summary-item">
                      <span className="summary-label">{carData.versions[selectedVersion].name}</span>
                      <span className="summary-value">0 VNĐ</span>
                    </div>
                    
                    <div className="summary-item">
                      <span className="summary-label">Nội thất {carData.interiorColors.find(c => c.id === selectedInteriorColor)?.name}</span>
                      <span className="summary-value">0 VNĐ</span>
                    </div>
                    
                    <div className="summary-item">
                      <span className="summary-label">{carData.exteriorColors.find(c => c.id === selectedExteriorColor)?.name}</span>
                      <span className="summary-value">
                        {carData.exteriorColors.find(c => c.id === selectedExteriorColor)?.price > 0 
                          ? `${carData.exteriorColors.find(c => c.id === selectedExteriorColor)?.price.toLocaleString('vi-VN')} VNĐ`
                          : '0 VNĐ'
                        }
                      </span>
                    </div>
                    
                    {selectedVersion === 'plus' && selectedOptions.sunroof && (
                      <div className="summary-item">
                        <span className="summary-label">{carData.options.sunroof.name}</span>
                        <span className="summary-value">{carData.options.sunroof.price.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                    )}
                    
                    {selectedVersion === 'plus' && selectedOptions.awd && (
                      <div className="summary-item">
                        <span className="summary-label">{carData.options.awd.name}</span>
                        <span className="summary-value">{carData.options.awd.price.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                    )}
                    
                    <div className="summary-item">
                      <span className="summary-label">Pin và sạc</span>
                      <span className="summary-value">0 VNĐ</span>
                    </div>
                  </div>
                  
                  <div className="summary-total">
                    <div className="total-row">
                      <span className="total-label">Giá tạm tính</span>
                      <span className="total-value">{calculateTotalPrice().toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <span className="vat-note">Giá xe đã bao gồm VAT.</span>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="pricing-links">
                  <a href="#" className="estimate-link">
                    <span className="link-icon">📊</span>
                    Chi tiết dự toán trả góp
                  </a>
                  <a href="#" className="estimate-link">
                    <span className="link-icon">🚙</span>
                    Chi tiết dự toán chi phí lăn bánh
                  </a>
                </div>

                {/* Next Step Button */}
                <Button 
                  type="primary" 
                  size="large" 
                  className={`next-step-btn ${!isStep1Valid() ? 'disabled' : ''}`}
                  onClick={handleNextStep}
                  disabled={!isStep1Valid()}
                  block
                >
                  BƯỚC TIẾP THEO
                </Button>
              </>
            )}

            {/* Step 2 Content */}
            {currentStep === 2 && (
              <>
                <div className="form-note">
                  <p>Tiếp theo, Quý khách hãy cung cấp thông tin chủ xe và lựa chọn Showroom nhận xe</p>
                </div>

                {/* Owner Information */}
                <div className="config-group">
                  <h3>Thông tin chủ xe</h3>
                  
                  <div className="owner-type-group">
                    <span className="owner-type-label">Chủ sở hữu xe là</span>
                    <Radio.Group 
                      value={ownerType} 
                      onChange={(e) => setOwnerType(e.target.value)}
                      className="owner-type-options"
                    >
                      <Radio value="individual">Cá Nhân</Radio>
                      <Radio value="business">Doanh Nghiệp</Radio>
                    </Radio.Group>
                  </div>

                  <div className="form-fields">
                    <div className="form-field">
                      <Input
                        placeholder="Họ và tên *"
                        value={customerInfo.fullName}
                        onChange={(e) => handleCustomerInfoChange('fullName', e.target.value)}
                        maxLength={80}
                        status={validationErrors.fullName ? 'error' : ''}
                      />
                      {validationErrors.fullName && (
                        <div className="error-message">{validationErrors.fullName}</div>
                      )}
                    </div>

                    <div className="form-field">
                      <Input
                        placeholder="Số điện thoại *"
                        value={customerInfo.phone}
                        onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                        maxLength={10}
                        status={validationErrors.phone ? 'error' : ''}
                      />
                      {validationErrors.phone && (
                        <div className="error-message">{validationErrors.phone}</div>
                      )}
                    </div>

                    <div className="form-field">
                      <Input
                        placeholder="Số CCCD *"
                        value={customerInfo.cccd}
                        onChange={(e) => handleCustomerInfoChange('cccd', e.target.value)}
                        maxLength={12}
                        status={validationErrors.cccd ? 'error' : ''}
                      />
                      {validationErrors.cccd && (
                        <div className="error-message">{validationErrors.cccd}</div>
                      )}
                    </div>

                    <div className="form-field">
                      <Input
                        placeholder="Email *"
                        value={customerInfo.email}
                        onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                        status={validationErrors.email ? 'error' : ''}
                      />
                      {validationErrors.email && (
                        <div className="error-message">{validationErrors.email}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                <div className="config-group">
                  <div className="program-header" onClick={() => setIsProgramExpanded(!isProgramExpanded)}>
                    <h3>Lựa chọn Chương trình</h3>
                    <span className="program-toggle">
                      {isProgramExpanded ? <UpOutlined /> : <DownOutlined />}
                    </span>
                  </div>
                  
                  {isProgramExpanded && (
                    <>
                      <div className="program-options">
                        {programs.map((program) => (
                          <div key={program.id} className="program-option">
                            <Checkbox
                              checked={selectedPrograms.includes(program.id)}
                              onChange={(e) => handleProgramChange(program.id, e.target.checked)}
                            >
                              {program.label}
                            </Checkbox>
                          </div>
                        ))}
                      </div>
                      
                      <div className="program-note">
                        <p><strong>Lưu ý:</strong></p>
                        <ul>
                          <li>Để hưởng ưu đãi, bạn cần đáp ứng đủ các điều kiện của chương trình.</li>
                          <li>Chính sách chương trình có thể thay đổi mà không cần thông báo trước. Chi tiết liên hệ hotline 1900 23 23 89.</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                {/* Showroom Selection */}
                <div className="config-group">
                  <h3>Showroom nhận xe</h3>
                  
                  <div className="form-fields">
                    <div className="form-field">
                      <Select
                        placeholder="Tỉnh thành *"
                        value={selectedProvince || undefined}
                        onChange={handleProvinceChange}
                        style={{ width: '100%' }}
                        status={validationErrors.province ? 'error' : ''}
                        allowClear
                      >
                        {provinces.map((province) => (
                          <Option key={province.value} value={province.value}>
                            {province.label}
                          </Option>
                        ))}
                      </Select>
                      {validationErrors.province && (
                        <div className="error-message">{validationErrors.province}</div>
                      )}
                    </div>

                    <div className="form-field">
                      <Select
                        placeholder="Showroom nhận xe *"
                        value={selectedShowroom || undefined}
                        onChange={handleShowroomChange}
                        style={{ width: '100%' }}
                        disabled={!selectedProvince}
                        status={validationErrors.showroom ? 'error' : ''}
                        allowClear
                      >
                        {selectedProvince && showrooms[selectedProvince]?.map((showroom) => (
                          <Option key={showroom.value} value={showroom.value}>
                            <div className="showroom-option">
                              <div className="showroom-name">{showroom.label}</div>
                              <div className="showroom-address">{showroom.address}</div>
                            </div>
                          </Option>
                        ))}
                      </Select>
                      {validationErrors.showroom && (
                        <div className="error-message">{validationErrors.showroom}</div>
                      )}
                    </div>

                    <div className="form-field">
                      <Input
                        placeholder="Tư vấn bán hàng"
                        value={consultant}
                        onChange={(e) => setConsultant(e.target.value)}
                        style={{ width: '100%' }}
                        list="consultants-list"
                      />
                      <datalist id="consultants-list">
                        {consultants.map((name, index) => (
                          <option key={index} value={name} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="price-summary step-2-price">
                  <div className="summary-total">
                    <div className="total-row">
                      <span className="total-label">Giá xe kèm pin</span>
                      <span className="total-value">{calculateTotalPrice().toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <span className="vat-note">Giá xe đã bao gồm VAT.</span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="step-navigation">
                  <Button 
                    size="large" 
                    className="prev-step-btn"
                    onClick={handlePrevStep}
                    style={{ marginRight: '12px' }}
                  >
                    QUAY LẠI
                  </Button>
                  <Tooltip
                    title={!isStep2Valid() ? "Vui lòng điền đầy đủ thông tin để tiếp tục" : ""}
                    placement="top"
                  >
                    <Button 
                      type="primary" 
                      size="large" 
                      className={`next-step-btn ${!isStep2Valid() ? 'disabled' : ''}`}
                      onClick={handleNextStep}
                      disabled={!isStep2Valid()}
                      style={{ flex: 1 }}
                    >
                      BƯỚC TIẾP THEO
                    </Button>
                  </Tooltip>
                </div>
              </>
            )}

            {/* Step 3 Content */}
            {currentStep === 3 && (
              <>
                {/* Order Information */}
                <div className="config-group">
                  <div className="program-header" onClick={() => setIsOrderInfoExpanded(!isOrderInfoExpanded)}>
                    <div className="header-content">
                      <h3>Thông tin đơn hàng</h3>
                      {!isOrderInfoExpanded && (
                        <span className="car-summary">
                          {carData.versions[selectedVersion].name}
                        </span>
                      )}
                    </div>
                    <span className="program-toggle">
                      {isOrderInfoExpanded ? <UpOutlined /> : <DownOutlined />}
                    </span>
                  </div>
                  
                  {isOrderInfoExpanded && (
                    <>
                      {/* Car Information */}
                      <div className="order-section">
                        <h4>THÔNG TIN XE</h4>
                        <div className="order-item">
                          <span className="order-label">{carData.versions[selectedVersion].name}</span>
                          <span className="order-value">{carData.versions[selectedVersion].price.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        <div className="order-item">
                          <span className="order-label">Kèm pin</span>
                        </div>
                        <div className="order-item">
                          <span className="order-label">Ngoại thất</span>
                          <span className="order-value">{carData.exteriorColors.find(c => c.id === selectedExteriorColor)?.name}</span>
                        </div>
                        <div className="order-item">
                          <span className="order-label">Nội thất</span>
                          <span className="order-value">{carData.interiorColors.find(c => c.id === selectedInteriorColor)?.name}</span>
                        </div>
                        {selectedVersion === 'plus' && selectedOptions.sunroof && (
                          <div className="order-item">
                            <span className="order-label">{carData.options.sunroof.name}</span>
                            <span className="order-value">{carData.options.sunroof.price.toLocaleString('vi-VN')} VNĐ</span>
                          </div>
                        )}
                        {selectedVersion === 'plus' && selectedOptions.awd && (
                          <div className="order-item">
                            <span className="order-label">{carData.options.awd.name}</span>
                            <span className="order-value">{carData.options.awd.price.toLocaleString('vi-VN')} VNĐ</span>
                          </div>
                        )}
                        <div className="order-item">
                          <span className="order-label">Tổng giá xe</span>
                          <span className="order-value">{calculateTotalPrice().toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                      </div>

                      {/* Customer Information */}
                      <div className="order-section">
                        <h4>THÔNG TIN CHỦ XE</h4>
                        <div className="order-item">
                          <span className="order-label">Chủ xe</span>
                          <span className="order-value">{customerInfo.fullName || '--------------------------------'}</span>
                        </div>
                        <div className="order-item">
                          <span className="order-label">Email</span>
                          <span className="order-value">{customerInfo.email || '--------------------------------'}</span>
                        </div>
                        <div className="order-item">
                          <span className="order-label">Số điện thoại</span>
                          <span className="order-value">{customerInfo.phone || '--------------------------------'}</span>
                        </div>
                        <div className="order-item">
                          <span className="order-label">Số CCCD</span>
                          <span className="order-value">{customerInfo.cccd || '--------------------------------'}</span>
                        </div>
                        <div className="order-item">
                          <span className="order-label">Showroom nhận xe</span>
                          <span className="order-value">
                            {selectedProvince && selectedShowroom ? 
                              showrooms[selectedProvince]?.find(s => s.value === selectedShowroom)?.label || '--------------------------------'
                              : '--------------------------------'
                            }
                          </span>
                        </div>
                        <div className="order-item">
                          <span className="order-label">Nhân viên tư vấn</span>
                          <span className="order-value">{consultant}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Payment Method */}
                <div className="config-group">
                  <h3>Hình thức thanh toán</h3>
                  
                  <Radio.Group 
                    value={paymentMethod} 
                    onChange={(e) => handlePaymentMethodChange(e.target.value)}
                    className="payment-methods"
                  >
                    <Radio value="international" className="payment-option">
                      Thẻ thanh toán quốc tế
                    </Radio>
                    
                    {(paymentMethod === 'international' || gatewayAnimationState.international !== 'closed') && (
                      <div className={`payment-gateway-section ${
                        gatewayAnimationState.international === 'opening' ? 'gateway-opening' :
                        gatewayAnimationState.international === 'closing' ? 'gateway-closing' : ''
                      }`}>
                        <p className="gateway-note">Quý khách vui lòng chọn cổng thanh toán</p>
                        <div className="gateway-options">
                          <Button 
                            className={`gateway-btn ${paymentGateway === 'onepay' ? 'selected' : ''}`}
                            onClick={() => setPaymentGateway('onepay')}
                          >
                            <div className="gateway-logo">
                              <img src={require('../../assets/payment-gateways/onepay-logo.png')} alt="OnePay" className="logo-image" />
                            </div>
                            <span className="gateway-name">Cổng OnePay</span>
                          </Button>
                          <Button 
                            className={`gateway-btn ${paymentGateway === 'payoo' ? 'selected' : ''}`}
                            onClick={() => setPaymentGateway('payoo')}
                          >
                            <div className="gateway-logo">
                              <img src={require('../../assets/payment-gateways/payoo-logo.png')} alt="Payoo" className="logo-image" />
                            </div>
                            <span className="gateway-name">Cổng Payoo</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <Radio value="atm" className="payment-option">
                      Thẻ ATM nội địa/Internet Banking
                    </Radio>
                    
                    {(paymentMethod === 'atm' || gatewayAnimationState.atm !== 'closed') && (
                      <div className={`payment-gateway-section ${
                        gatewayAnimationState.atm === 'opening' ? 'gateway-opening' :
                        gatewayAnimationState.atm === 'closing' ? 'gateway-closing' : ''
                      }`}>
                        <p className="gateway-note">Quý khách vui lòng chọn cổng thanh toán</p>
                        <div className="gateway-options">
                          <Button 
                            className={`gateway-btn ${paymentGateway === 'onepay' ? 'selected' : ''}`}
                            onClick={() => setPaymentGateway('onepay')}
                          >
                            <div className="gateway-logo">
                              <img src={require('../../assets/payment-gateways/onepay-logo.png')} alt="OnePay" className="logo-image" />
                            </div>
                            <span className="gateway-name">Cổng OnePay</span>
                          </Button>
                          <Button 
                            className={`gateway-btn ${paymentGateway === 'payoo' ? 'selected' : ''}`}
                            onClick={() => setPaymentGateway('payoo')}
                          >
                            <div className="gateway-logo">
                              <img src={require('../../assets/payment-gateways/payoo-logo.png')} alt="Payoo" className="logo-image" />
                            </div>
                            <span className="gateway-name">Cổng Payoo</span>
                          </Button>
                        </div>
                      </div>
                    )}

                    <Radio value="bank-transfer" className="payment-option">
                      Chuyển khoản ngân hàng
                    </Radio>
                  </Radio.Group>
                </div>

                {/* Terms and Conditions */}
                <div className="config-group">
                  <h3>Điều khoản và điều kiện</h3>
                  
                  <div className="terms-conditions">
                    <Checkbox
                      checked={termsAccepted.infoConfirm}
                      onChange={(e) => handleTermsChange('infoConfirm', e.target.checked)}
                    >
                      Tôi xác nhận thông tin đơn hàng là chính xác.
                    </Checkbox>
                    <Checkbox
                      checked={termsAccepted.termsConditions}
                      onChange={(e) => handleTermsChange('termsConditions', e.target.checked)}
                    >
                      Tôi đồng ý với <a href="#" className="terms-link">Điều khoản và điều kiện</a> của VinFast.
                    </Checkbox>
                    <Checkbox
                      checked={termsAccepted.dataPolicy}
                      onChange={(e) => handleTermsChange('dataPolicy', e.target.checked)}
                    >
                      Tôi đồng ý với <a href="#" className="terms-link">Chính sách bảo mật dữ liệu</a> của VinFast.
                    </Checkbox>
                    <Checkbox
                      checked={termsAccepted.vinFastTerms}
                      onChange={(e) => handleTermsChange('vinFastTerms', e.target.checked)}
                    >
                      Tôi đồng ý với <a href="#" className="terms-link">Điều khoản và điều kiện</a> của VinFast.
                    </Checkbox>
                  </div>
                </div>

                {/* Deposit Amount */}
                <div className="deposit-section">
                  <div className="deposit-row">
                    <span className="deposit-label">Số tiền đặt cọc</span>
                    <span className="deposit-amount">10.000.000 VND</span>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="step-navigation">
                  <Button 
                    size="large" 
                    className="prev-step-btn"
                    onClick={handlePrevStep}
                    style={{ marginRight: '12px' }}
                  >
                    QUAY LẠI
                  </Button>
                  <Tooltip
                    title={!isStep3Valid() ? "Vui lòng chọn phương thức thanh toán và đồng ý với các điều khoản" : ""}
                    placement="top"
                  >
                    <Button 
                      type="primary" 
                      size="large" 
                      className={`payment-btn ${!isStep3Valid() ? 'disabled' : ''}`}
                      onClick={handlePayment}
                      disabled={!isStep3Valid()}
                      style={{ flex: 1 }}
                    >
                      THANH TOÁN ĐẶT CỌC
                    </Button>
                  </Tooltip>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal
        visible={isLightboxVisible}
        footer={null}
        onCancel={() => setIsLightboxVisible(false)}
        centered
        width="90vw"
        className="lightbox-modal"
      >
        <div className="lightbox-content">
          {getAllImages().length > 0 && (
            <>
              <img 
                src={getAllImages()[currentImageIndex]} 
                alt={`${carData.name} ${currentImageIndex === 0 ? 'ngoại thất' : 'nội thất'}`}
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="lightbox-nav">
                <Button onClick={prevImage}>Trước</Button>
                <span>{currentImageIndex + 1} / {getAllImages().length}</span>
                <Button onClick={nextImage}>Sau</Button>
              </div>
            </>
          )}
          {getAllImages().length === 0 && (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>Không có ảnh cho lựa chọn này</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CarDetail;