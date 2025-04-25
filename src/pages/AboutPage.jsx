import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function AboutPage() {
    return (
        <div>
            {/* About Header */}
            <div className="tw-bg-gray-100 tw-py-12">
                <Container>
                    <h1 className="tw-text-4xl tw-font-bold tw-mb-4 tw-text-center">About Us</h1>
                    <p className="tw-text-gray-600 tw-text-center tw-max-w-2xl tw-mx-auto">
                        Learn about our story, our mission, and the people behind ProductStore.
                    </p>
                </Container>
            </div>

            {/* Our Story */}
            <Container className="tw-py-16">
                <Row className="tw-items-center">
                    <Col md={6} className="tw-mb-4 tw-mb-md-0">
                        <h2 className="tw-text-3xl tw-font-bold tw-mb-4">Our Story</h2>
                        <p className="tw-mb-4">
                            Founded in 2015, ProductStore began with a simple mission: to provide high-quality products at affordable prices. What started as a small online shop has grown into a trusted destination for shoppers worldwide.
                        </p>
                        <p className="tw-mb-4">
                            Our founders, Jane and John Smith, noticed a gap in the market for reliable, well-crafted products that didn't break the bank. With backgrounds in retail and technology, they combined their expertise to create a shopping experience that prioritizes quality, value, and customer satisfaction.
                        </p>
                        <p>
                            Today, we continue to expand our product range while maintaining our commitment to excellence. We carefully select each item in our inventory to ensure it meets our high standards.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}