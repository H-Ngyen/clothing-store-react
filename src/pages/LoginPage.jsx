import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { loginMyUserApi } from '../api/MyUserApi';
import { isAuthenticated } from '../auth/auth'; 

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState('danger'); 
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/admin-product-management');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const result = await loginMyUserApi({ email, password });
            
            if (result.success) {
                setMessageType('success');
                setMessage('Đăng nhập thành công!');
                setShowMessage(true);
                
                setTimeout(() => {
                    navigate('/admin-product-management'); 
                }, 1500);
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
            <Card className="tw-p-4 tw-shadow tw-rounded tw-max-w-[400px] tw-w-full">
                <Card.Body>
                    <Card.Title className="tw-text-center tw-mb-4">Đăng nhập</Card.Title>
                    
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
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="tw-border tw-border-gray-300 tw-p-2"
                            />
                        </Form.Group>

                        <Form.Group className="tw-mb-3" controlId="formPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </Button>
                        
                        <div className="tw-text-center tw-mt-2">
                            Chưa có tài khoản?{' '}
                            <Link to="/register-form" className="tw-text-blue-600 tw-font-medium">
                                Đăng ký ngay
                            </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}