import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { getProductApi } from '../api/ProductApi';
import { deleteMyProductApi } from '../api/MyProductApi';
import ProductTableItem from '../components/ItemProductTable';
import ProductGridItem from '../components/ItemProductGrid';
import ProductFormModal from '../components/ProductFormModal';

export default function ProductManagementPage() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        id: '',
        name: '',
        price: '',
        category: '',
        image: null,
        description: '',
        review: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [viewMode, setViewMode] = useState('table');

    const handleModalClose = () => {
        setShowModal(false);
        resetForm();
    };

    const refreshProducts = async () => {
        try {            
            const productList = await getProductApi();
            setProducts(productList);
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    };

    useEffect(() => {        
        refreshProducts();
    }, []);

    const handleModalShow = (product = null) => {
        if (product) {
            setCurrentProduct({ ...product, image: null }); 
            setIsEditing(true);
        } else {
            resetForm();
            setIsEditing(false);
        }
        setShowModal(true);
    };

    const resetForm = () => {
        setCurrentProduct({
            id: '',
            name: '',
            price: '',
            category: '',
            image: null,
            description: '',
            review: ''
        });
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({
            ...currentProduct,
            [name]: value
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteMyProductApi(id);
                setProducts(products.filter(product => product.id !== id));
                alert('Product deleted successfully');
            } catch (error) {
                console.error("Failed to delete product:", error);
                
                // Kiểm tra lỗi 401 hoặc 403 để xác định token hết hạn
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                }
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === '' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <Container fluid className="tw-py-4">
            <Row className="tw-mb-4">
                <Col>
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">Product Management</h1>
                </Col>
            </Row>

            <Row className="tw-mb-4">
                <Col md={4}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="tw-border tw-border-gray-300 tw-rounded"
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="tw-border tw-border-gray-300 tw-rounded"
                    >
                        <option value="">All Categories</option>
                        <option value="Hoodies">Hoodies</option>
                        <option value="Pants">Pants</option>
                        <option value="Shirts">Shirts</option>
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <div className="tw-flex tw-items-center">
                        <Button
                            variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
                            className="tw-mr-2"
                            onClick={() => setViewMode('table')}
                        >
                            Table View
                        </Button>
                        <Button
                            variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                            onClick={() => setViewMode('grid')}
                        >
                            Grid View
                        </Button>
                    </div>
                </Col>
                <Col md={2} className="tw-text-right">
                    <Button variant="success" onClick={() => handleModalShow()}>
                        Add Product
                    </Button>
                </Col>
            </Row>

            {viewMode === 'table' ? (
                <Table striped bordered hover responsive className="tw-bg-white tw-shadow-md tw-rounded">
                    <thead className="tw-bg-gray-100">
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(prod => (
                            <ProductTableItem
                                key={prod.id}
                                product={prod}
                                onEdit={handleModalShow}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Row>
                    {filteredProducts.map(prod => (
                        <ProductGridItem
                            key={prod.id}
                            product={prod}
                            onEdit={handleModalShow}
                            onDelete={handleDelete}
                        />
                    ))}
                </Row>
            )}

            <ProductFormModal
                show={showModal}
                onHide={handleModalClose}
                isEditing={isEditing}
                product={currentProduct}
                onChange={handleInputChange}
                products={products}
                onProductAdded={refreshProducts}
            />
        </Container>
    );
};