import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function ContactPage() {
    return (
        <div>
            {/* Contact Header */}
            <div className="tw-bg-gray-100 tw-py-12">
                <Container>
                    <h1 className="tw-text-4xl tw-font-bold tw-mb-4 tw-text-center">Contact Us</h1>
                    <p className="tw-text-gray-600 tw-text-center tw-max-w-2xl tw-mx-auto">
                        Have questions or feedback? We'd love to hear from you. Our team is here to help!
                    </p>
                </Container>
            </div>

            {/* Contact Information */}
            <Container className="tw-py-16">
                <Row>
                    <Col lg={5} className="tw-mb-5">
                        <h2 className="tw-text-2xl tw-font-bold tw-mb-4">Get In Touch</h2>
                        <p className="tw-text-gray-600 tw-mb-5">
                            Fill out the form or reach out to us using the contact information below. We aim to respond to all inquiries within 24 hours.
                        </p>

                        <div className="tw-mb-4">
                            <h5 className="tw-font-bold tw-mb-2">Our Address</h5>
                            <p className="tw-text-gray-600">
                                123 Product Street<br />
                                Commerce City, State 12345<br />
                                United States
                            </p>
                        </div>

                        <div className="tw-mb-4">
                            <h5 className="tw-font-bold tw-mb-2">Email Us</h5>
                            <p className="tw-text-gray-600">
                                <a href="mailto:info@productstore.com" className="tw-text-blue-600 hover:tw-text-blue-800">
                                    info@productstore.com
                                </a>
                            </p>
                        </div>

                        <div className="tw-mb-4">
                            <h5 className="tw-font-bold tw-mb-2">Call Us</h5>
                            <p className="tw-text-gray-600">
                                <a href="tel:+11234567890" className="tw-text-blue-600 hover:tw-text-blue-800">
                                    +1 (123) 456-7890
                                </a>
                            </p>
                        </div>

                        <div className="tw-mb-4">
                            <h5 className="tw-font-bold tw-mb-2">Business Hours</h5>
                            <p className="tw-text-gray-600">
                                Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                                Saturday: 10:00 AM - 2:00 PM EST<br />
                                Sunday: Closed
                            </p>
                        </div>

                        <div className="tw-mt-5">
                            <h5 className="tw-font-bold tw-mb-3">Follow Us</h5>
                            <div className="tw-flex">
                                <a href="#" className="tw-bg-gray-200 tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mr-3 hover:tw-bg-blue-600 hover:tw-text-white tw-transition-colors">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="#" className="tw-bg-gray-200 tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mr-3 hover:tw-bg-blue-600 hover:tw-text-white tw-transition-colors">
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a href="#" className="tw-bg-gray-200 tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mr-3 hover:tw-bg-blue-600 hover:tw-text-white tw-transition-colors">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="#" className="tw-bg-gray-200 tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center hover:tw-bg-blue-600 hover:tw-text-white tw-transition-colors">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
