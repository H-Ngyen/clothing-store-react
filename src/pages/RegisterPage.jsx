import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { registerMyUserApi } from '../api/MyUserApi';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(''); 
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState('danger');
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const isValidToken = validateToken(token);
            if (isValidToken) {
                navigate('/admin-product-management');
            }
        }
    }, [navigate]);

    const validateToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload && payload.exp * 1000 > Date.now();
        } catch (error) {
            return false;
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const validateForm = () => {
        
        if (!formData.email.trim()) {
            setMessage('Vui lòng nhập email');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setMessage('Email không hợp lệ');
            return false;
        }
        
        if (formData.password.length < 6) {
            setMessage('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setMessage('Mật khẩu và xác nhận mật khẩu không khớp');
            return false;
        }
        
        return true;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setMessageType('danger');
            setShowMessage(true);
            return;
        }
        
        setLoading(true);
        
        try {
            const result = await registerMyUserApi(formData);
            
            if (result.success) {
                setMessageType('success');
                setMessage('Đăng ký thành công! Đang chuyển hướng...');
                setShowMessage(true);
                
                setTimeout(() => {
                    navigate('/admin-product-management'); 
                }, 2000);
            } else {
                setMessageType('danger');
                setMessage(result.message);
                setShowMessage(true);
            }
        } catch (error) {
            setMessageType('danger');
            setMessage('Lỗi: ' + error.message);
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Container className="tw-flex tw-items-center tw-justify-center tw-min-h-screen">
            <Card className="tw-p-4 tw-shadow tw-rounded tw-max-w-[500px] tw-w-full">
                <Card.Body>
                    <Card.Title className="tw-text-center tw-mb-4 tw-text-xl">Đăng ký tài khoản</Card.Title>
                    
                    {showMessage && (
                        <Alert variant={messageType} onClose={() => setShowMessage(false)} dismissible>
                            {message}
                        </Alert>
                    )}
                    
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="tw-mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="tw-border tw-border-gray-300 tw-p-2"
                            />
                        </Form.Group>

                        <Form.Group className="tw-mb-3" controlId="formPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="tw-border tw-border-gray-300 tw-p-2"
                            />
                        </Form.Group>
                        
                        <Form.Group className="tw-mb-4" controlId="formConfirmPassword">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="tw-border tw-border-gray-300 tw-p-2"
                            />
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="tw-bg-blue-600 tw-text-white tw-w-full tw-mb-3"
                            disabled={loading}
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng ký'}
                        </Button>
                        
                        <div className="tw-text-center tw-mt-2">
                            Đã có tài khoản?{' '}
                            <Link to="/login-form" className="tw-text-blue-600 tw-font-medium">
                                Đăng nhập
                            </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}