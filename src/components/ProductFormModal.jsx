import React, { useState } from 'react';
import { Modal, Form, Button, Spinner, Alert, Image } from 'react-bootstrap';
import { createMyProductApi, updateMyProductApi } from '../api/MyProductApi';

export default function ProductFormModal({ show, onHide, isEditing, product, onChange, products, onProductAdded }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(product?.image || null);

    const generateNextId = () => {
        const categoryCodeMap = {
            "Hoodies": "PD01",
            "Pants": "PD02",
            "Shirts": "PD03"
        };

        // Mặc định là PD01 nếu không có danh mục
        const categoryCode = categoryCodeMap[product.category] || "PD01";

        // Tìm số thứ tự cao nhất từ tất cả sản phẩm
        let maxSequentialNumber = 0;
        const validPrefixes = ['CLOSPD01', 'CLOSPD02', 'CLOSPD03'];
        products.forEach(p => {
            if (p.id && validPrefixes.some(prefix => p.id.startsWith(prefix))) {
                const sequentialPart = parseInt(p.id.slice(8), 10);
                if (!isNaN(sequentialPart) && sequentialPart > maxSequentialNumber) {
                    maxSequentialNumber = sequentialPart;
                }
            }
        });

        // Tăng số thứ tự lên 1 và định dạng thành 4 chữ số
        const nextSequentialNumber = String(maxSequentialNumber + 1).padStart(4, '0');

        return `CLOS${categoryCode}${nextSequentialNumber}`;
    };

    const predictedId = !isEditing && product.category ? generateNextId() : product.id;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange({
                target: {
                    name: 'image',
                    value: file
                }
            });
            
            // Create a preview of the selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        try {
            const formdata = new FormData();
            
            formdata.append('id', predictedId);
            formdata.append('name', product.name);
            formdata.append('price', product.price);
            formdata.append('category', product.category);
            formdata.append('description', product.description || '');
            formdata.append('review', product.review || '');
            
            if (product.image && product.image instanceof File) {
                formdata.append('image', product.image);
            }
            
            if (isEditing) {
                await updateMyProductApi(formdata, product.id);
            } else {
                await createMyProductApi(formdata);
            }
            onProductAdded();
            onHide();
        } catch (err) {
            console.error('Error submitting product:', err);
            setError(err.response?.data?.message || 'Failed to save product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && (
                    <Alert variant="danger" className="tw-mb-4">
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="tw-mb-3">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={predictedId || ''}
                            readOnly
                            className="tw-border tw-border-gray-300 tw-rounded tw-bg-gray-100"
                        />
                        {!isEditing && (
                            <Form.Text className="text-muted">
                                This ID will be automatically assigned when you save the product.
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="tw-mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={onChange}
                            required
                            className="tw-border tw-border-gray-300 tw-rounded"
                        />
                    </Form.Group>

                    <Form.Group className="tw-mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={onChange}
                            required
                            className="tw-border tw-border-gray-300 tw-rounded"
                        />
                    </Form.Group>

                    <Form.Group className="tw-mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={product.category}
                            onChange={onChange}
                            required
                            className="tw-border tw-border-gray-300 tw-rounded"
                        >
                            <option value="">Select Category</option>
                            <option value="Hoodies">Hoodies</option>
                            <option value="Pants">Pants</option>
                            <option value="Shirts">Shirts</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="tw-mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={product.description}
                            onChange={onChange}
                            className="tw-border tw-border-gray-300 tw-rounded"
                        />
                    </Form.Group>

                    <Form.Group className="tw-mb-3">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                            type="text"
                            name="review"
                            value={product.review}
                            onChange={onChange}
                            className="tw-border tw-border-gray-300 tw-rounded"
                        />
                    </Form.Group>

                    <Form.Group className="tw-mb-3">
                        <Form.Label>Image</Form.Label>
                        <div className="tw-mb-2">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="tw-border tw-border-gray-300 tw-rounded tw-p-1"
                            />
                        </div>
                        {imagePreview && (
                            <div className="tw-mt-2">
                                <Image
                                    src={imagePreview}
                                    alt="Product preview"
                                    thumbnail
                                    className="tw-max-h-32 tw-max-w-full"
                                />
                            </div>
                        )}
                    </Form.Group>

                    <div className="tw-mt-4 tw-flex tw-justify-end">
                        <Button variant="secondary" onClick={onHide} className="tw-mr-2" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting || !product.category}
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="tw-mr-2"
                                    />
                                    {isEditing ? 'Updating...' : 'Saving...'}
                                </>
                            ) : (
                                isEditing ? 'Update' : 'Save'
                            )}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}