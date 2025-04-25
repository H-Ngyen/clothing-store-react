import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function HeaderClient() {
    const navigate = useNavigate();

    const handleLoginClick = () =>{
        navigate('/login-form')
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" className="tw-py-3">
                <Container>
                    <Navbar.Brand className="tw-text-xl tw-font-bold" as={Link} to={'/home'}>ProductStore</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="tw-ml-auto">
                            <Nav.Link as={Link} to={'/home'}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to={'/collection'}>
                                Collection
                            </Nav.Link>
                            <Nav.Link as={Link} to={'/about-us'}>
                                About
                            </Nav.Link>
                            <Nav.Link as={Link} to={'/contact'}>
                                Contact
                            </Nav.Link>
                        </Nav>
                        <div className="tw-ml-4 tw-flex">
                            <Button variant="outline-light" className="tw-mr-2">
                                <i className="bi bi-search"></i>
                            </Button>
                            <Button variant="outline-light" className="tw-mr-2">
                                <i className="bi bi-cart"></i>
                            </Button>
                            <Button variant="primary" onClick={handleLoginClick}>Login</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}