import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function NotFound() {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <div className="mb-4">
            <h1 className="display-1 text-primary fw-bold">404</h1>
            <h2 className="h3 text-muted mb-3">صفحه مورد نظر یافت نشد</h2>
            <p className="text-muted mb-4">
              متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
            </p>
          </div>
          
          <div className="mb-4">
            <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Button as={Link} to="/" variant="primary" size="lg" className="px-4 py-2">
              بازگشت به صفحه اصلی
            </Button>
            <Button 
              onClick={() => window.history.back()} 
              variant="outline-secondary" 
              size="lg" 
              className="px-4 py-2">
              بازگشت به صفحه قبل
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
} 