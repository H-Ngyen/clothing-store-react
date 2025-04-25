import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Button, Form, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    // const featuredProducts = [
    //     {
    //         id: 'P001',
    //         name: 'Smartphone X',
    //         price: '999.99',
    //         category: 'Electronics',
    //         image: 'https://via.placeholder.com/300x200',
    //         description: 'Latest smartphone with advanced features'
    //     },
    //     {
    //         id: 'P002',
    //         name: 'Laptop Pro',
    //         price: '1299.99',
    //         category: 'Electronics',
    //         image: 'https://via.placeholder.com/300x200',
    //         description: 'High-performance laptop for professionals'
    //     },
    //     {
    //         id: 'P003',
    //         name: 'Cotton T-Shirt',
    //         price: '19.99',
    //         category: 'Clothing',
    //         image: 'https://via.placeholder.com/300x200',
    //         description: 'Comfortable cotton t-shirt'
    //     },
    //     {
    //         id: 'P004',
    //         name: 'Coffee Maker',
    //         price: '89.99',
    //         category: 'Home Appliances',
    //         image: 'https://via.placeholder.com/300x200',
    //         description: 'Automatic coffee maker with timer'
    //     }
    // ];

    const navigate = useNavigate();

    return (
        <div>
            {/* Hero Section */}
            <div className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white">
                <Container className="tw-py-16">
                    <Row className="tw-items-center">
                        <Col md={6} className="tw-mb-4 tw-mb-md-0">
                            <h1 className="tw-text-4xl tw-font-bold tw-mb-4">Discover Amazing Products</h1>
                            <p className="tw-text-xl tw-mb-6">
                                Find the best quality products for your everyday needs. Explore our collection now!
                            </p>
                            <div className="tw-flex">
                                <Button variant="light" size="lg" className="tw-font-semibold tw-mr-3" onClick={() => navigate('/collection')}>
                                    Shop Now
                                </Button>
                            </div>
                        </Col>
                        <Col md={6}>
                            <img
                                src={`http://res.cloudinary.com/djey3wddu/image/upload/v1745568583/sezhk6hvwxxqtoil0qgy.png`}
                                alt="Hero"
                                className="tw-rounded-lg tw-shadow-lg tw-w-full"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Categories Section */}
            {/* <Container className="tw-py-16">
                <h2 className="tw-text-3xl tw-font-bold tw-mb-8 tw-text-center">Top Categories</h2>
                <Row>
                    {['Electronics', 'Clothing', 'Home Appliances', 'Accessories'].map((category, index) => (
                        <Col key={index} md={3} className="tw-mb-4">
                            <Card className="tw-h-full tw-shadow-sm tw-transition-transform tw-duration-300 hover:tw-transform hover:tw-scale-105">
                                <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=${category}`} />
                                <Card.Body className="tw-text-center">
                                    <Card.Title className="tw-font-bold">{category}</Card.Title>
                                    <Button variant="outline-primary" className="tw-mt-2">Explore</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container> */}

            {/* Featured Products */}
            {/* <div className="tw-bg-gray-100 tw-py-16">
                <Container>
                    <h2 className="tw-text-3xl tw-font-bold tw-mb-8 tw-text-center">Featured Products</h2>
                    <Row>
                        {featuredProducts.map(product => (
                            <Col key={product.id} md={3} className="tw-mb-4">
                                <Card className="tw-h-full tw-shadow-sm tw-transition-all tw-duration-300 hover:tw-shadow-lg">
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title className="tw-font-bold">{product.name}</Card.Title>
                                        <Card.Text className="tw-text-gray-600">{product.category}</Card.Text>
                                        <Card.Text className="tw-font-semibold tw-text-lg">${product.price}</Card.Text>
                                        <Button variant="primary" className="tw-w-full">Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="tw-text-center tw-mt-8">
                        <Button variant="outline-primary" size="lg">View All Products</Button>
                    </div>
                </Container>
            </div> */}

            {/* Testimonials */}
            {/* <Container className="tw-py-16">
                <h2 className="tw-text-3xl tw-font-bold tw-mb-8 tw-text-center">What Our Customers Say</h2>
                <Row>
                    {[1, 2, 3].map(index => (
                        <Col key={index} md={4} className="tw-mb-4">
                            <Card className="tw-h-full tw-shadow-sm tw-p-2">
                                <Card.Body>
                                    <div className="tw-flex tw-mb-4">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <i key={star} className="bi bi-star-fill tw-text-warning"></i>
                                        ))}
                                    </div>
                                    <Card.Text className="tw-mb-4">
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque."
                                    </Card.Text>
                                    <div className="tw-flex tw-items-center">
                                        <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-gray-300 tw-mr-3"></div>
                                        <div>
                                            <h6 className="tw-font-bold tw-mb-0">Customer Name</h6>
                                            <small className="tw-text-gray-600">Verified Buyer</small>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container> */}

            {/* Newsletter */}
            {/* <div className="tw-bg-blue-600 tw-text-white tw-py-12">
                <Container className="tw-text-center">
                    <h2 className="tw-text-3xl tw-font-bold tw-mb-4">Join Our Newsletter</h2>
                    <p className="tw-text-xl tw-mb-6 tw-max-w-2xl tw-mx-auto">
                        Stay updated with our latest products and special offers. Subscribe now!
                    </p>
                    <Row className="tw-justify-content-center">
                        <Col md={6}>
                            <Form className="tw-flex">
                                <Form.Control
                                    type="email"
                                    placeholder="Your email address"
                                    className="tw-mr-2"
                                />
                                <Button variant="light" className="tw-font-semibold">Subscribe</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div> */}
        </div>
    );
};

export default HomePage;