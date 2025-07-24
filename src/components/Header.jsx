import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../hooks/CartStore';

export default function Header() {
  const navigate = useNavigate();
  const totalCount = useCartStore(x => x.totalCount);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Link to="/" className="text-white text-decoration-none">خانه</Link>
            <Link to="/about" className="text-white text-decoration-none">درباره ما</Link>
            <Link to="/contact" className="text-white text-decoration-none">تماس با ما</Link>
          </Nav>

          <div className="d-flex">
            <Button variant="outline-light" className="ms-2" onClick={() => navigate('/cart')}>سبد خرید ({totalCount})</Button>
            <Button variant="outline-light" className="ms-2" onClick={() => navigate('/login')}>ورود</Button>
            <Button variant="warning" onClick={() => navigate('/register')}>ثبت نام</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
