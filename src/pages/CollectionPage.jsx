import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { getProductApi } from '../api/ProductApi';
import { useNavigate } from 'react-router-dom';

export default function CollectionPage() {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductApi = async () => {
      try {
        const productList = await getProductApi();
        setProducts(productList);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    fetchProductApi();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === '' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price-low') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortBy === 'price-high') {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return 0;
    });

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Đảm bảo currentPage hợp lệ
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1 && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Lấy sản phẩm cho trang hiện tại
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
  };

  return (
    <div>
      {/* Collection Content */}
      <Container className="tw-py-8">
        <Row>
          {/* Filter Button (Mobile) */}
          <Col xs={12} className="tw-mb-4 tw-block md:tw-hidden">
            <Button
              variant="outline-primary"
              className="tw-w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'} <i className="bi bi-filter"></i>
            </Button>
          </Col>

          {/* Sidebar Filters */}
          <Col md={3} className={`${showFilters ? 'tw-block' : 'tw-hidden'} md:tw-block tw-mb-4`}>
            <Card className="tw-shadow-sm">
              <Card.Header className="tw-bg-gray-100 tw-font-bold">Filters</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="tw-mb-4">
                    <Form.Label className="tw-font-semibold">Search</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="tw-mb-4">
                    <Form.Label className="tw-font-semibold">Category</Form.Label>
                    <Form.Select
                      value={filterCategory}
                      onChange={(e) => {
                        setFilterCategory(e.target.value);
                        setCurrentPage(1); // Reset về trang 1 khi thay đổi danh mục
                      }}
                    >
                      <option value="">All Categories</option>
                      <option value="Hoodies">Hoodies</option>
                      <option value="Pants">Pants</option>
                      <option value="Shirts">Shirts</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="tw-mb-4">
                    <Form.Label className="tw-font-semibold">Sort By</Form.Label>
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setCurrentPage(1); // Reset về trang 1 khi thay đổi sắp xếp
                      }}
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Products Grid */}
          <Col md={9}>
            <div className="tw-mb-4 tw-flex tw-justify-between tw-items-center">
              <p className="tw-mb-0">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </p>
              <div className="tw-hidden md:tw-block">
                <Form.Select
                  className="tw-w-auto"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1); // Reset về trang 1
                  }}
                >
                  <option value="name">Sort by: Name (A-Z)</option>
                  <option value="price-low">Sort by: Price (Low to High)</option>
                  <option value="price-high">Sort by: Price (High to Low)</option>
                </Form.Select>
              </div>
            </div>

            <Row>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <Col key={product.id} sm={6} lg={4} className="tw-mb-4">
                    <Card
                      className="tw-h-full tw-shadow-sm tw-transition-all tw-duration-300 hover:tw-shadow-lg"
                      onClick={() => navigate(`/product-detail/${product.id}`, { state: { product } })}
                      style={{ cursor: 'pointer' }}
                    >
                      <Card.Img
                        variant="top"
                        src={product.image}
                        className="tw-h-full tw-object-contain"
                        alt={product.name}
                      />
                      <Card.Body>
                        <Card.Title className="tw-font-bold">{product.name}</Card.Title>
                        <Card.Text className="tw-text-gray-600 tw-mb-1">{product.category}</Card.Text>
                        <Card.Text className="tw-font-semibold tw-text-lg tw-mb-2">${product.price}</Card.Text>
                        <Card.Text className="tw-text-sm tw-text-gray-600 tw-mb-3 tw-line-clamp-2">
                          {product.description}
                        </Card.Text>
                        <div className="tw-text-sm tw-text-gray-600 tw-mb-3">
                          <i className="bi bi-star-fill tw-text-warning tw-mr-1"></i>
                          {`Review: ${product.review || 'No reviews'}`}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col xs={12} className="tw-text-center tw-py-16">
                  <h3 className="tw-text-gray-500">No products match your criteria</h3>
                  <Button
                    variant="outline-primary"
                    className="tw-mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterCategory('');
                      setCurrentPage(1);
                    }}
                  >
                    Clear Filters
                  </Button>
                </Col>
              )}
            </Row>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="tw-mt-6 tw-flex tw-justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Giới hạn số nút trang hiển thị (tối đa 5 nút)
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  // Điều chỉnh startPage nếu endPage gần cuối
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};