import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';

export default function ItemProductGrid({ product, onEdit, onDelete }) {
    return (
        <Col md={4} lg={3} key={product.id} className="tw-mb-4">
            <Card className="tw-h-full tw-shadow-md tw-rounded">
                <Card.Img
                    variant="top"
                    src={product.image}
                    className="tw-h-full tw-object-contain"
                />
                <Card.Body>
                    <Card.Title className="tw-font-bold">{product.name}</Card.Title>
                    <Card.Text className="tw-text-gray-700 tw-mb-1">
                        <strong>ID:</strong> {product.id}
                    </Card.Text>
                    <Card.Text className="tw-text-gray-700 tw-mb-1">
                        <strong>Price:</strong> ${product.price}
                    </Card.Text>
                    <Card.Text className="tw-text-gray-700 tw-mb-1">
                        <strong>Category:</strong> {product.category}
                    </Card.Text>
                    <Card.Text className="tw-text-gray-700 tw-mb-1 tw-truncate">
                        {product.description}
                    </Card.Text>
                    <Card.Text className="tw-text-gray-700 tw-mb-3">
                        <strong>Review:</strong> {product.review}
                    </Card.Text>
                    <div className="tw-flex tw-justify-between">
                        <Button
                            variant="info"
                            size="sm"
                            onClick={() => onEdit(product)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(product.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}
