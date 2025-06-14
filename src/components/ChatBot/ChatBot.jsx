import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, Spin, Card, Row, Tag, Col } from 'antd';
import { MessageOutlined, CloseOutlined, CarOutlined } from '@ant-design/icons';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatBot = ({ onChatToggle }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Notify parent component when chat opens/closes
    const toggleChat = (isOpen) => {
        setIsChatOpen(isOpen);
        if (onChatToggle) {
            onChatToggle(isOpen);
        }
    };
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // Khởi tạo Google AI với API key
    const genAI = new GoogleGenerativeAI("AIzaSyBJy-DswHgXLYZvyXhh3p49aZzdXTeCl-s");

    const storeInfo = {
        name: "VinFast Vietnam",
        address: "123 Đường Vingroup, Quận Nam Từ Liêm, Hà Nội",
        phone: "1800 8086",
        hours: "8:00 - 20:00 hàng ngày",
        email: "support@vinfastauto.com",
        website: "www.vinfastauto.com"
    };

    // Dữ liệu VinFast theo thông tin user cung cấp
    const vinfastModels = {
        "VF e34": {
            name: "VinFast VF e34",
            type: "Subcompact SUV",
            seats: "5 chỗ",
            motor: "110 kW, 242 Nm",
            battery: "44-42 kWh",
            range: "~300 km theo WLTP/NEDC",
            realRange: "200-250 km (thực tế)",
            priceVN: "~690 triệu VNĐ (chưa bao gồm pin)",
            priceRollOut: "~750 triệu VNĐ (lăn bánh)",
            deposit: "~10 triệu VNĐ",
            batteryRental: "1,5-2,6 triệu VNĐ/tháng",
            chargingTime: "Level 1: 16-20h, Level 3: 45 phút (80%)",
            chargingCost: "50-80k VNĐ/lần sạc đầy",
            acceleration: "Chưa công bố",
            drivetrain: "FWD (cầu trước)",
            features: "6 túi khí, ABS/ESC, camera 360°, màn hình 10″, điều khiển giọng nói, cập nhật OTA",
            warranty: "Xe 10 năm, Pin 10 năm/200.000 km",
            pros: "Giá kinh tế, phù hợp đô thị, chính sách thuê pin linh hoạt, bảo hành pin 10 năm/200.000 km",
            cons: "Tầm thực tế có thể thấp, ít mạnh mẽ, phụ thuộc vào hệ thống sạc"
        },
        "VF 5": {
            name: "VinFast VF 5",
            type: "Dòng đô thị nhỏ gọn",
            seats: "Chưa công bố",
            features: "Hướng đến người trẻ, đô thị, tính năng hiện đại",
            status: "Chưa có giá cụ thể, đang phát triển"
        },
        "VF 6": {
            name: "VinFast VF 6", 
            type: "Dòng đô thị nhỏ gọn",
            seats: "Chưa công bố",
            features: "Hướng đến người trẻ, đô thị, tính năng hiện đại",
            status: "Chưa có giá cụ thể, đang phát triển"
        },
        "VF 7": {
            name: "VinFast VF 7",
            type: "Dòng đô thị nhỏ gọn", 
            seats: "Chưa công bố",
            features: "Hướng đến người trẻ, đô thị, tính năng hiện đại",
            status: "Chưa có giá cụ thể, đang phát triển"
        },
        "VF 8": {
            name: "VinFast VF 8",
            type: "Midsize SUV",
            seats: "5 chỗ",
            motor: "Eco: 260 kW/500 Nm; Plus: 300 kW/620 Nm (AWD dual-motor)",
            battery: "82-87,7 kWh",
            range: "350-410 km WLTP",
            realRange: "280-350 km (thực tế)",
            priceUS: "Eco ~47.200 USD, Plus ~53.000 USD",
            priceVN: "Eco ~1,2 tỷ VNĐ, Plus ~1,4 tỷ VNĐ (dự kiến)",
            chargingTime: "Level 1: 24-30h, Level 3: 30-45 phút (10-80%)",
            chargingCost: "120-180k VNĐ/lần sạc đầy",
            acceleration: "Eco: 5,9s, Plus: 5,4s (0-100km/h)",
            drivetrain: "AWD (2 cầu) cho Plus, FWD cho Eco",
            airbags: "11 túi khí",
            warranty: "Xe 10 năm/200.000km, Pin 10 năm/175.000km",
            carplay: "Apple CarPlay/Android Auto (có lỗi disconnect thỉnh thoảng)",
            features: "11 túi khí, ABS/ESC, camera 360°, màn hình 15.6″, sưởi/làm mát ghế, cập nhật OTA",
            climateImpact: "Điều hòa/sưởi giảm tầm 15-25%",
            commonIssues: "Lỗi phần mềm, camera lag, CarPlay disconnect, cảm biến đỗ xe",
            userReviews: "Mỹ: 2-2.5/5 sao, phàn nàn về software bugs và build quality",
            pros: "Nội thất rộng rãi, hệ thống infotainment hiện đại, bảo hành 10 năm hữu dụng, performance mạnh",
            cons: "Chất lượng hoàn thiện chưa ổn định, phần mềm/sensor lỗi vặt, phản hồi chủ nhân Mỹ trung bình 2-2.5/5 sao"
        },
        "VF 9": {
            name: "VinFast VF 9",
            type: "Full-size SUV",
            seats: "7 chỗ",
            motor: "AWD hai motor, công suất 402 hp",
            battery: "92 hoặc 123 kWh", 
            range: "438-594 km WLTP",
            realRange: "380-480 km (thực tế)",
            priceUS: "~75.000 USD (Plus)",
            priceVN: "~2-2,5 tỷ VNĐ (dự kiến)",
            chargingTime: "Level 1: 36-48h, Level 3: 35-50 phút (10-80%)",
            chargingCost: "200-300k VNĐ/lần sạc đầy",
            acceleration: "5,5s (0-100km/h)",
            drivetrain: "AWD (2 cầu)",
            airbags: "11 túi khí",
            warranty: "Xe 10 năm/200.000km, Pin 10 năm/175.000km",
            carplay: "Apple CarPlay/Android Auto",
            features: "3 hàng ghế rộng, 11 túi khí, ABS/ESC, camera 360°, màn hình 15.6″, thiết kế Pininfarina, ghế massage",
            climateImpact: "Điều hòa/sưởi giảm tầm 15-20%",
            pros: "Sang trọng, không gian rộng, công suất cao, thiết kế đẹp, trang bị cao cấp",
            cons: "Giá cao, cần kiểm chứng reliability lâu dài (chưa có nhiều phản hồi quốc tế)"
        }
    };

    const vinfastKeywords = [
        'vinfast', 'vf', 'e34', 'vf8', 'vf9', 'vf5', 'vf6', 'vf7',
        'xe điện', 'suv điện', 'ô tô điện', 'xe vinfast'
    ];

    const questionPatterns = {
        charging: ['sạc', 'nạp pin', 'level 1', 'level 3', 'charging', 'chi phí sạc', 'thời gian sạc'],
        battery: ['pin', 'battery', 'thuê pin', 'mua pin', 'subscription', 'pin xuống'],
        range: ['tầm', 'quãng đường', 'km chạy', 'range', 'hết pin'],
        performance: ['0-100', 'tăng tốc', 'acceleration', 'hiệu suất', 'cầu trước', 'awd', 'fwd'],
        safety: ['túi khí', 'abs', 'esc', 'camera 360', 'an toàn', 'airbag'],
        warranty: ['bảo hành', 'warranty', 'đổi pin', 'bảo hành pin'],
        price: ['giá', 'lăn bánh', 'price', 'cost', 'vay', 'trả góp', 'leasing'],
        issues: ['lỗi', 'bug', 'phàn nàn', 'problems', 'issues', 'disconnect', 'phần mềm'],
        infrastructure: ['trạm sạc', 'charging station', 'sạc nhanh', 'carplay', 'android auto'],
        climate: ['điều hòa', 'sưởi', 'air conditioning', 'heating', 'giảm tầm']
    };

    const storeKeywords = [
        'địa chỉ', 'giờ mở cửa', 'số điện thoại', 'liên hệ', 
        'email', 'thông tin', 'showroom', 'cửa hàng'
    ];

    useEffect(() => {
        if (isChatOpen) {
            setTimeout(() => {
                const chatBox = document.getElementById('chat-box-container');
                if (chatBox) {
                    chatBox.scrollTo({
                        top: chatBox.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }, [isChatOpen, chatHistory]);

    useEffect(() => {
        const initializeChatHistory = async () => {
            if (isChatOpen && chatHistory.length === 0) {
                setChatHistory([{
                    sender: 'ai',
                    message: (
                        <div>
                            <p>🚗 Xin chào! Tôi là <strong>VinBot</strong>, trợ lý ảo chuyên tư vấn xe điện VinFast.</p>
                            <p>Tôi có thể giúp gì cho bạn hôm nay? 😊</p>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li>⚡ Tư vấn các dòng xe điện VinFast</li>
                                <li>💰 Thông tin giá cả và chính sách</li>
                                <li>🔋 Thông số pin và tầm hoạt động</li>
                                <li>🏢 Thông tin showroom VinFast</li>
                            </ul>
                            <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
                                Bạn quan tâm đến dòng VinFast nào? VF e34, VF 8, VF 9 hay các dòng khác? 🚙
                            </p>
                        </div>
                    )
                }]);
            }
        };

        initializeChatHistory();
    }, [isChatOpen, chatHistory.length]);

    const getStoreInfoResponse = (question) => {
        const lowerQuestion = question.toLowerCase();

        if (lowerQuestion.includes('địa chỉ') || lowerQuestion.includes('ở đâu')) {
            return `🏢 Showroom ${storeInfo.name} tại: ${storeInfo.address}. Hãy ghé thăm để trải nghiệm trực tiếp các mẫu xe điện VinFast! ⚡🚗`;
        }
        else if (lowerQuestion.includes('giờ') || lowerQuestion.includes('mở cửa')) {
            return `⏰ Showroom mở cửa ${storeInfo.hours}. Chúng tôi luôn sẵn sàng tư vấn xe điện VinFast cho bạn! 😊`;
        }
        else if (lowerQuestion.includes('điện thoại') || lowerQuestion.includes('liên hệ')) {
            return `📞 Hotline VinFast: ${storeInfo.phone}. Đội ngũ tư vấn chuyên nghiệp sẽ hỗ trợ bạn về xe điện VinFast 24/7! 💪`;
        }
        else if (lowerQuestion.includes('email')) {
            return `📧 Email VinFast: ${storeInfo.email}. Gửi yêu cầu tư vấn về xe điện, chúng tôi sẽ phản hồi trong vòng 24h! ✨`;
        }
        else {
            return (
                <div>
                    <p>🚗 <strong>Thông tin VinFast Vietnam:</strong></p>
                    <p>🏢 <strong>Địa chỉ:</strong> {storeInfo.address}</p>
                    <p>⏰ <strong>Giờ mở cửa:</strong> {storeInfo.hours}</p>
                    <p>📞 <strong>Hotline:</strong> {storeInfo.phone}</p>
                    <p>📧 <strong>Email:</strong> {storeInfo.email}</p>
                    <p>🌐 <strong>Website:</strong> {storeInfo.website}</p>
                    <p style={{ marginTop: '10px' }}>
                        Chúng tôi mong được tư vấn xe điện VinFast cho bạn! 🤝⚡
                    </p>
                </div>
            );
        }
    };

    const getVinFastRecommendations = (message) => {
        const lowerMessage = message.toLowerCase();
        const recommendations = [];

        // Xử lý câu hỏi về số chỗ ngồi cụ thể
        if (lowerMessage.includes('4 chỗ')) {
            // VinFast chưa có xe 4 chỗ chính thức, gợi ý VF e34 5 chỗ gần nhất
            recommendations.push({
                name: "VinFast VF e34", 
                type: "Subcompact SUV 5 chỗ (gần nhất với 4 chỗ)",
                price: "~690 triệu VNĐ",
                description: "SUV điện nhỏ gọn nhất của VinFast, phù hợp cho cặp đôi hoặc gia đình nhỏ",
                range: "~300 km",
                note: "VinFast hiện chưa có xe 4 chỗ, VF e34 5 chỗ là lựa chọn nhỏ gọn nhất"
            });
            // Thêm VF 5 đang phát triển
            recommendations.push({
                name: "VinFast VF 5",
                type: "Dòng đô thị nhỏ gọn (đang phát triển)",
                price: "Chưa công bố",
                description: "Xe điện đô thị hướng đến người trẻ, có thể có phiên bản 4 chỗ",
                range: "Chưa công bố",
                note: "Dự kiến ra mắt trong tương lai"
            });
        }
        else if (lowerMessage.includes('gia đình') || lowerMessage.includes('7 chỗ') || lowerMessage.includes('rộng')) {
            recommendations.push({
                name: "VinFast VF 9",
                type: "Full-size SUV 7 chỗ",
                price: "~75.000 USD",
                description: "SUV điện cao cấp 7 chỗ, thiết kế Pininfarina sang trọng",
                range: "438-594 km"
            });
        }
        else if (lowerMessage.includes('tiết kiệm') || lowerMessage.includes('rẻ') || lowerMessage.includes('phù hợp')) {
            recommendations.push({
                name: "VinFast VF e34", 
                type: "Subcompact SUV 5 chỗ",
                price: "~690 triệu VNĐ",
                description: "SUV điện nhỏ gọn, phù hợp đô thị, chính sách thuê pin linh hoạt",
                range: "~300 km"
            });
        }
        else if (lowerMessage.includes('suv') || lowerMessage.includes('5 chỗ')) {
            recommendations.push({
                name: "VinFast VF 8",
                type: "Midsize SUV 5 chỗ", 
                price: "Eco ~47.200 USD, Plus ~53.000 USD",
                description: "SUV điện tầm trung, nội thất rộng rãi, infotainment hiện đại",
                range: "350-410 km"
            });
        }
        else {
            // Gợi ý toàn bộ dòng VinFast
            recommendations.push({
                name: "VinFast VF e34",
                type: "Subcompact SUV", 
                price: "~690 triệu VNĐ",
                description: "Xe điện đô thị tiết kiệm",
                range: "~300 km"
            });
            recommendations.push({
                name: "VinFast VF 8",
                type: "Midsize SUV",
                price: "~47.200-53.000 USD", 
                description: "SUV điện tầm trung phổ biến",
                range: "350-410 km"
            });
            recommendations.push({
                name: "VinFast VF 9",
                type: "Full-size SUV",
                price: "~75.000 USD",
                description: "SUV điện cao cấp 7 chỗ",
                range: "438-594 km"
            });
        }

        return recommendations;
    };

    const normalizeText = (text) => {
        if (!text) return '';
        return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const isVinFastRelated = (message) => {
        const normalized = normalizeText(message);
        return vinfastKeywords.some(keyword => normalized.includes(keyword)) ||
               normalized.includes('xe dien') ||
               normalized.includes('xe hoi') ||
               normalized.includes('o to');
    };

    const isStoreInfoQuery = (message) => {
        const normalized = normalizeText(message);
        return storeKeywords.some(keyword => normalized.includes(keyword));
    };

    const getSpecificModelInfo = (message) => {
        const normalized = normalizeText(message);
        
        if (normalized.includes('e34')) {
            return vinfastModels["VF e34"];
        } else if (normalized.includes('vf8') || normalized.includes('vf 8')) {
            return vinfastModels["VF 8"];
        } else if (normalized.includes('vf9') || normalized.includes('vf 9')) {
            return vinfastModels["VF 9"];
        } else if (normalized.includes('vf5') || normalized.includes('vf 5')) {
            return vinfastModels["VF 5"];
        } else if (normalized.includes('vf6') || normalized.includes('vf 6')) {
            return vinfastModels["VF 6"];
        } else if (normalized.includes('vf7') || normalized.includes('vf 7')) {
            return vinfastModels["VF 7"];
        }
        
        return null;
    };

    const detectQuestionType = (message) => {
        const normalized = normalizeText(message);
        
        for (const [type, keywords] of Object.entries(questionPatterns)) {
            if (keywords.some(keyword => normalized.includes(normalizeText(keyword)))) {
                return type;
            }
        }
        return null;
    };

    const getSmartAnswer = (message, questionType) => {
        const normalized = normalizeText(message);
        
        // Xác định mẫu xe trong câu hỏi
        let targetModel = null;
        if (normalized.includes('e34')) targetModel = vinfastModels["VF e34"];
        else if (normalized.includes('vf8') || normalized.includes('vf 8')) targetModel = vinfastModels["VF 8"];
        else if (normalized.includes('vf9') || normalized.includes('vf 9')) targetModel = vinfastModels["VF 9"];

        switch (questionType) {
            case 'charging':
                return (
                    <div>
                        <p>🔌 <strong>Thông tin sạc xe VinFast:</strong></p>
                        {targetModel ? (
                            <Card size="small" style={{ backgroundColor: '#f0f8ff', border: '1px solid #1e3c72' }}>
                                <p><strong>{targetModel.name}:</strong></p>
                                <p>⏱️ <strong>Thời gian sạc:</strong> {targetModel.chargingTime}</p>
                                <p>💰 <strong>Chi phí sạc:</strong> {targetModel.chargingCost}</p>
                            </Card>
                        ) : (
                            <div>
                                <p>⏱️ <strong>Thời gian sạc chung:</strong></p>
                                <p>• Level 1 (ổ cắm gia đình): 16-48h tùy dung lượng pin</p>
                                <p>• Level 3 (sạc nhanh DC): 30-50 phút (10-80%)</p>
                                <p>💰 <strong>Chi phí sạc ở VN:</strong> 50-300k VNĐ/lần tùy mẫu xe</p>
                            </div>
                        )}
                        <p style={{ marginTop: '10px', fontSize: '12px', fontStyle: 'italic' }}>
                            💡 Lưu ý: Pin dưới 0% vẫn sạc được bình thường, không lo hỏng pin!
                        </p>
                    </div>
                );

            case 'battery':
                return (
                    <div>
                        <p>🔋 <strong>Thông tin pin VinFast:</strong></p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Card size="small" style={{ backgroundColor: '#e8f5e8' }}>
                                <p><strong>📦 Mua pin đứt:</strong></p>
                                <p>✅ Sở hữu hoàn toàn, không phí hàng tháng</p>
                                <p>❌ Chi phí ban đầu cao, rủi ro hao pin theo thời gian</p>
                            </Card>
                            <Card size="small" style={{ backgroundColor: '#fff8dc' }}>
                                <p><strong>📅 Thuê pin (Subscription):</strong></p>
                                <p>✅ Chi phí ban đầu thấp, đổi pin mới khi dưới 70%</p>
                                <p>❌ Phí hàng tháng: VF e34 (~2M), VF 8 (~3M), VF 9 (~4M)</p>
                            </Card>
                        </div>
                        <p style={{ marginTop: '10px', fontSize: '12px', fontStyle: 'italic' }}>
                            💡 Thuê pin được khuyến nghị cho người dùng mới!
                        </p>
                    </div>
                );

            case 'range':
                return (
                    <div>
                        <p>🛣️ <strong>Tầm hoạt động thực tế VinFast:</strong></p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                                <p><strong>VF e34:</strong> {vinfastModels["VF e34"].realRange}</p>
                            </Card>
                            <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                                <p><strong>VF 8:</strong> {vinfastModels["VF 8"].realRange}</p>
                            </Card>
                            <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                                <p><strong>VF 9:</strong> {vinfastModels["VF 9"].realRange}</p>
                            </Card>
                        </div>
                        <p style={{ marginTop: '10px', fontSize: '12px', fontStyle: 'italic' }}>
                            ❄️ Lưu ý: Điều hòa/sưởi có thể giảm tầm 15-25%
                        </p>
                    </div>
                );

            case 'performance':
                return (
                    <div>
                        <p>🏎️ <strong>Hiệu suất VinFast:</strong></p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                                <p><strong>VF e34:</strong></p>
                                <p>🚗 Dẫn động: {vinfastModels["VF e34"].drivetrain}</p>
                                <p>🏁 0-100km/h: {vinfastModels["VF e34"].acceleration}</p>
                            </Card>
                            <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                                <p><strong>VF 8:</strong></p>
                                <p>🚗 Dẫn động: {vinfastModels["VF 8"].drivetrain}</p>
                                <p>🏁 0-100km/h: {vinfastModels["VF 8"].acceleration}</p>
                            </Card>
                            <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                                <p><strong>VF 9:</strong></p>
                                <p>🚗 Dẫn động: {vinfastModels["VF 9"].drivetrain}</p>
                                <p>🏁 0-100km/h: {vinfastModels["VF 9"].acceleration}</p>
                            </Card>
                        </div>
                    </div>
                );

            case 'safety':
                return (
                    <div>
                        <p>🛡️ <strong>Trang bị an toàn VinFast:</strong></p>
                        <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                            <p>🎈 <strong>VF e34:</strong> 6 túi khí, ABS/ESC, camera 360°</p>
                            <p>🎈 <strong>VF 8/9:</strong> 11 túi khí, ABS/ESC, camera 360°, cảm biến đỗ xe</p>
                            <p>📱 <strong>Công nghệ:</strong> Cảm biến va chạm, phanh khẩn cấp, cảnh báo làn đường</p>
                        </Card>
                    </div>
                );

            case 'warranty':
                return (
                    <div>
                        <p>🔧 <strong>Chính sách bảo hành VinFast:</strong></p>
                        <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                            <p>🚗 <strong>Xe:</strong> 10 năm hoặc 200.000 km</p>
                            <p>🔋 <strong>Pin:</strong> 10 năm hoặc 175.000-200.000 km</p>
                            <p>🔄 <strong>Đổi pin thuê:</strong> Miễn phí khi dưới 70% dung lượng</p>
                        </Card>
                        <p style={{ marginTop: '10px', fontSize: '12px', fontStyle: 'italic' }}>
                            💡 Chính sách bảo hành tốt nhất trong ngành!
                        </p>
                    </div>
                );

            case 'price':
                return (
                    <div>
                        <p>💰 <strong>Bảng giá VinFast tại Việt Nam:</strong></p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                                <p><strong>VF e34:</strong> {vinfastModels["VF e34"].priceRollOut} (lăn bánh)</p>
                            </Card>
                            <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                                <p><strong>VF 8:</strong> {vinfastModels["VF 8"].priceVN} (dự kiến)</p>
                            </Card>
                            <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                                <p><strong>VF 9:</strong> {vinfastModels["VF 9"].priceVN} (dự kiến)</p>
                            </Card>
                        </div>
                        <p>🏦 <strong>Hỗ trợ tài chính:</strong> Vay 80%, lãi suất ưu đãi, trả góp 7 năm</p>
                    </div>
                );

            case 'issues':
                return (
                    <div>
                        <p>⚠️ <strong>Vấn đề thường gặp VinFast:</strong></p>
                        <Card size="small" style={{ backgroundColor: '#fff8dc' }}>
                            <p><strong>VF 8 phổ biến:</strong></p>
                            <p>• {vinfastModels["VF 8"].commonIssues}</p>
                            <p>• Đánh giá người dùng: {vinfastModels["VF 8"].userReviews}</p>
                        </Card>
                        <p style={{ marginTop: '10px', fontSize: '12px', fontStyle: 'italic' }}>
                            💡 VinFast đang liên tục cập nhật phần mềm để khắc phục các lỗi này
                        </p>
                    </div>
                );

            case 'infrastructure':
                return (
                    <div>
                        <p>🏗️ <strong>Hạ tầng sạc VinFast:</strong></p>
                        <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                            <p>🗺️ <strong>Trạm sạc:</strong></p>
                            <p>• Hà Nội: Vincom, Time City, Royal City, Lotte</p>
                            <p>• TP.HCM: Landmark 81, Vincom Center, Saigon Centre</p>
                            <p>⚡ <strong>Tốc độ:</strong> AC 22kW, DC 150kW</p>
                        </Card>
                        <p>📱 <strong>CarPlay/Android Auto:</strong> {vinfastModels["VF 8"].carplay}</p>
                    </div>
                );

            case 'climate':
                return (
                    <div>
                        <p>❄️ <strong>Ảnh hưởng điều hòa/sưởi đến tầm xe:</strong></p>
                        <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
                            <p>• <strong>VF e34:</strong> Giảm 15-25% tầm khi dùng điều hòa</p>
                            <p>• <strong>VF 8:</strong> {vinfastModels["VF 8"].climateImpact}</p>
                            <p>• <strong>VF 9:</strong> {vinfastModels["VF 9"].climateImpact}</p>
                        </Card>
                        <p style={{ marginTop: '10px', fontSize: '12px', fontStyle: 'italic' }}>
                            💡 Mẹo: Sử dụng chế độ ECO để tiết kiệm pin hơn
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };

    const handleSendMessage = async () => {
        if (!chatMessage.trim()) return;

        setChatHistory(prev => [...prev, { sender: 'user', message: chatMessage }]);
        setLoading(true);

        const userMessage = chatMessage;
        setChatMessage('');

        // Kiểm tra câu hỏi về thông tin cửa hàng
        if (isStoreInfoQuery(userMessage)) {
            setChatHistory(prev => [...prev, {
                sender: 'ai',
                message: getStoreInfoResponse(userMessage)
            }]);
            setLoading(false);
            return;
        }

        // Kiểm tra loại câu hỏi thông minh
        const questionType = detectQuestionType(userMessage);
        if (questionType && isVinFastRelated(userMessage)) {
            const smartAnswer = getSmartAnswer(userMessage, questionType);
            if (smartAnswer) {
                setChatHistory(prev => [...prev, {
                    sender: 'ai',
                    message: smartAnswer
                }]);
                setLoading(false);
                return;
            }
        }

        // Kiểm tra câu hỏi về mẫu xe cụ thể
        const specificModel = getSpecificModelInfo(userMessage);
        if (specificModel) {
            setChatHistory(prev => [...prev, {
                sender: 'ai',
                message: (
                    <div>
                        <p>🚗 <strong>Thông tin {specificModel.name}:</strong></p>
                        <Card 
                            size="small" 
                            style={{ 
                                backgroundColor: '#f0f8ff',
                                border: '1px solid #1e3c72',
                                marginTop: '10px'
                            }}
                        >
                            <p><strong>📊 Phân khúc:</strong> {specificModel.type}</p>
                            {specificModel.seats && <p><strong>👥 Số chỗ:</strong> {specificModel.seats}</p>}
                            {specificModel.motor && <p><strong>⚡ Động cơ:</strong> {specificModel.motor}</p>}
                            {specificModel.battery && <p><strong>🔋 Pin:</strong> {specificModel.battery}</p>}
                            {specificModel.range && <p><strong>🛣️ Tầm hoạt động:</strong> {specificModel.range}</p>}
                            {specificModel.priceVN && <p><strong>💰 Giá VN:</strong> {specificModel.priceVN}</p>}
                            {specificModel.priceUS && <p><strong>💰 Giá US:</strong> {specificModel.priceUS}</p>}
                            {specificModel.deposit && <p><strong>💳 Phí đặt cọc:</strong> {specificModel.deposit}</p>}
                            {specificModel.features && <p><strong>✨ Trang bị:</strong> {specificModel.features}</p>}
                            {specificModel.pros && <p><strong>✅ Ưu điểm:</strong> {specificModel.pros}</p>}
                            {specificModel.cons && <p><strong>⚠️ Nhược điểm:</strong> {specificModel.cons}</p>}
                            {specificModel.status && <p><strong>📋 Trạng thái:</strong> {specificModel.status}</p>}
                        </Card>
                        <p style={{ marginTop: '10px', fontSize: '12px', fontStyle: 'italic' }}>
                            Bạn có muốn tôi tư vấn thêm về mẫu xe VinFast khác không? 😊
                        </p>
                    </div>
                )
            }]);
            setLoading(false);
            return;
        }

        // Kiểm tra câu hỏi về VinFast và đưa ra gợi ý
        if (isVinFastRelated(userMessage)) {
            const recommendations = getVinFastRecommendations(userMessage);
            
            if (recommendations.length > 0) {
                setChatHistory(prev => [...prev, {
                    sender: 'ai',
                    message: (
                        <div>
                            <p>⚡ Dựa trên nhu cầu của bạn, tôi gợi ý các mẫu xe điện VinFast sau:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {recommendations.map((car, index) => (
                                    <Card 
                                        key={index}
                                        size="small" 
                                        style={{ 
                                            backgroundColor: '#f0f8ff',
                                            border: '1px solid #1e3c72'
                                        }}
                                    >
                                        <div>
                                            <p style={{ fontWeight: 'bold', color: '#1e3c72', margin: 0 }}>
                                                {car.name}
                                            </p>
                                            <p style={{ color: '#666', fontSize: '12px', margin: '2px 0' }}>
                                                {car.type}
                                            </p>
                                            <p style={{ color: '#ff6b6b', fontWeight: 'bold', margin: '5px 0' }}>
                                                {car.price}
                                            </p>
                                            <p style={{ color: '#28a745', fontSize: '12px', margin: '2px 0' }}>
                                                🔋 Tầm: {car.range}
                                            </p>
                                            <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>
                                                {car.description}
                                            </p>
                                            {car.note && (
                                                <p style={{ color: '#ff6b6b', fontSize: '11px', margin: '5px 0', fontStyle: 'italic' }}>
                                                    💡 {car.note}
                                                </p>
                                            )}
                                            <Button
                                                type="primary"
                                                size="small"
                                                style={{
                                                    marginTop: '8px',
                                                    background: '#1e3c72',
                                                    borderColor: '#1e3c72',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                            <p style={{ marginTop: '10px', fontSize: '12px', fontStyle: 'italic' }}>
                                Bạn có muốn tôi tư vấn thêm về mẫu xe VinFast cụ thể nào không? (VF e34, VF 8, VF 9...) 😊
                            </p>
                        </div>
                    )
                }]);
                setLoading(false);
                return;
            }
        }

        // Nếu không liên quan đến VinFast, chuyển hướng về VinFast
        setChatHistory(prev => [...prev, {
            sender: 'ai',
            message: (
                <div>
                    <p>🚗 Xin lỗi, tôi chỉ chuyên tư vấn về xe điện VinFast.</p>
                    <p>Tôi có thể giúp bạn:</p>
                    <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                        <li>⚡ Tư vấn VinFast VF e34 - SUV điện tiết kiệm</li>
                        <li>🚙 Tư vấn VinFast VF 8 - SUV điện 5 chỗ phổ biến</li>
                        <li>🏆 Tư vấn VinFast VF 9 - SUV điện cao cấp 7 chỗ</li>
                        <li>📊 So sánh các dòng xe VinFast</li>
                        <li>💰 Thông tin giá cả và chính sách</li>
                    </ul>
                    <p>Bạn quan tâm đến dòng VinFast nào? 😊</p>
                </div>
            )
        }]);
        setLoading(false);

        setTimeout(() => {
            const chatBox = document.getElementById('chat-box-container');
            if (chatBox) {
                chatBox.scrollTo({
                    top: chatBox.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    return (
        <div style={{ zIndex: 2, position: 'absolute', top: 0 }}>
            {!isChatOpen && (
                <div
                    className="chatbot-button"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '30px',
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#1e3c72',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(30, 60, 114, 0.3)',
                        transition: 'all 0.3s ease',
                        animation: 'pulse 2s infinite'
                    }}
                    onClick={() => toggleChat(true)}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.backgroundColor = '#2a5298';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = '#1e3c72';
                    }}
                >
                    <MessageOutlined style={{ color: 'white', fontSize: '24px' }} />
                </div>
            )}
            {isChatOpen && (
                <div
                    className="chatbot-window"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '30px',
                        width: '380px',
                        height: '550px',
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 1000,
                        border: '2px solid #1e3c72'
                    }}
                >
                    <div
                        style={{
                            background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                            color: 'white',
                            padding: '15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CarOutlined style={{ fontSize: '20px' }} />
                            <span style={{ fontWeight: 'bold' }}>VinBot - Tư vấn VinFast</span>
                        </div>
                        <CloseOutlined
                            style={{ 
                                cursor: 'pointer', 
                                fontSize: '16px',
                                padding: '4px',
                                borderRadius: '4px',
                                transition: 'background-color 0.3s'
                            }}
                            onClick={() => toggleChat(false)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        />
                    </div>
                    <div
                        id="chat-box-container"
                        style={{
                            flex: 1,
                            padding: '15px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            backgroundColor: '#f8f9fa'
                        }}
                    >
                        {chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                style={{
                                    alignSelf: chat.sender === 'user' ? 'flex-end' : 'flex-start',
                                    backgroundColor: chat.sender === 'user' ? '#1e3c72' : 'white',
                                    color: chat.sender === 'user' ? 'white' : '#333',
                                    padding: '10px 14px',
                                    borderRadius: '15px',
                                    maxWidth: '85%',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    border: chat.sender === 'ai' ? '1px solid #e0e0e0' : 'none'
                                }}
                            >
                                {chat.message}
                            </div>
                        ))}
                        {loading && (
                            <div style={{ alignSelf: 'center', padding: '10px' }}>
                                <Spin size="small" />
                                <span style={{ marginLeft: '8px', color: '#666' }}>VinBot đang suy nghĩ...</span>
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            padding: '15px',
                            borderTop: '1px solid #e0e0e0',
                            display: 'flex',
                            gap: '10px',
                            backgroundColor: 'white'
                        }}
                    >
                        <Input
                            value={chatMessage}
                            onChange={e => setChatMessage(e.target.value)}
                            placeholder="Hỏi về xe điện VinFast..."
                            onPressEnter={handleSendMessage}
                            style={{ 
                                flex: 1,
                                borderRadius: '20px',
                                border: '1px solid #1e3c72'
                            }}
                            disabled={loading}
                        />
                        <Button
                            type="primary"
                            onClick={handleSendMessage}
                            loading={loading}
                            style={{
                                borderRadius: '20px',
                                background: '#1e3c72',
                                borderColor: '#1e3c72',
                                fontWeight: 'bold'
                            }}
                        >
                            Gửi
                        </Button>
                    </div>
                </div>
            )}
            <style jsx>{`
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(30, 60, 114, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(30, 60, 114, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(30, 60, 114, 0);
                    }
                }
                
                @media (max-width: 768px) {
                    .chatbot-button {
                        bottom: 20px !important;
                        right: 20px !important;
                    }
                    .chatbot-window {
                        bottom: 20px !important;
                        right: 20px !important;
                        width: calc(100vw - 40px) !important;
                        max-width: 350px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ChatBot;