import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import useCartStore from '../hooks/CartStore';

export default function Header() {
  const navigate = useNavigate();
  const totalCount = useCartStore(x => x.totalCount);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState('');

  // بررسی وضعیت ورود کاربر
  useEffect(() => {
    const checkLoginStatus = () => {
      const userId = localStorage.getItem('userId');
      const fullName = localStorage.getItem('fullName');

      if (userId && fullName) {
        setIsLoggedIn(true);
        setUserFullName(fullName);
      } else {
        setIsLoggedIn(false);
        setUserFullName('');
      }
    };

    checkLoginStatus();
  }, []);

  // تابع خروج از حساب کاربری
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('fullName');
    setIsLoggedIn(false);
    setUserFullName('');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Link to="/" className="text-white text-decoration-none">خانه</Link>
            <Link to="/about" className="text-white text-decoration-none">درباره ما</Link>
            <Link to="/locations" className="text-white text-decoration-none">مکان های فروش</Link>
          </Nav>

          <div className="d-flex">
            {
              isLoggedIn
                ? <>
                  <Button variant="outline-light" className="ms-2" onClick={() => navigate('/cart')}>
                    سبد خرید ({totalCount})
                  </Button>
                  <div className="text-white d-flex align-items-center ms-3">
                    <span className="me-2">خوش آمدید، {userFullName}</span>
                  </div>
                  <Button variant="outline-danger" className="ms-2" onClick={handleLogout}>
                    خروج
                  </Button>
                </>
                : <>
                  <Button variant="outline-light" className="ms-2" onClick={() => navigate('/login')}>
                    ورود
                  </Button>
                  <Button variant="warning" onClick={() => navigate('/register')}>
                    ثبت نام
                  </Button>
                </>
            }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
