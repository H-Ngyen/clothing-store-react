import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProductDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; // Get product data from navigation state

  if (!product) {
    return (
      <Container className="tw-py-8">
        <Card className="tw-shadow-lg tw-border-0 tw-rounded-lg">
          <Card.Body className="tw-text-center tw-p-6">
            <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">Product Not Found</h2>
            <p className="tw-text-gray-600 tw-mb-4">The product you're looking for doesn't exist or has been removed.</p>
            <Button
              variant="primary"
              onClick={() => navigate(-1)}
              className="tw-px-4 tw-py-2 tw-rounded-full tw-font-semibold tw-transition tw-duration-300 hover:tw-bg-primary-dark"
            >
              Go Back
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="tw-py-8">
      <style>
        {`
          .product-detail-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .product-detail-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
          }
          .product-image {
            max-height: 400px;
            object-fit: contain;
            border-radius: 8px;
            background: #f8f9fa;
            padding: 10px;
          }
          .btn-custom {
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          .btn-custom:hover {
            transform: scale(1.05);
          }
          .category-badge {
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
            border-radius: 20px;
          }
        `}
      </style>
      <Card className="tw-shadow-lg tw-border-0 tw-rounded-lg product-detail-card">
        <Card.Body className="tw-p-6">
          <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate(-1)}
              className="tw-rounded-full tw-px-4 tw-py-2 tw-font-semibold btn-custom"
            >
              <i className="bi bi-arrow-left tw-mr-2"></i> Back to Collection
            </Button>
            <Badge bg="info" className="category-badge">
              {product.category}
            </Badge>
          </div>
          <Row>
            <Col md={6} className="tw-mb-4 tw-mb-md-0">
              <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-flex tw-justify-center tw-items-center tw-h-full">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image tw-w-full"
                  />
                ) : (
                  <div className="tw-text-gray-400 tw-py-10 tw-text-center">
                    <p>No image available</p>
                  </div>
                )}
              </div>
            </Col>
            <Col md={6}>
              <h2 className="tw-text-3xl tw-font-bold tw-text-gray-800 tw-mb-2">{product.name}</h2>
              <p className="tw-text-gray-500 tw-text-sm tw-mb-4">Product ID: {product.id}</p>
              <div className="tw-mb-4">
                <h3 className="tw-text-2xl tw-font-semibold tw-text-primary">${product.price}</h3>
              </div>
              <div className="tw-mb-4">
                <h4 className="tw-font-semibold tw-text-gray-700 tw-mb-2">Description</h4>
                <p className="tw-text-gray-600 tw-leading-relaxed">
                  {product.description || 'No description available.'}
                </p>
              </div>
              <div className="tw-mb-6">
                <h4 className="tw-font-semibold tw-text-gray-700 tw-mb-2">Review</h4>
                <p className="tw-text-gray-600">
                  {product.review ? (
                    <>
                      <i className="bi bi-star-fill tw-text-warning tw-mr-2"></i>
                      {product.review}
                    </>
                  ) : (
                    'No reviews yet.'
                  )}
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}