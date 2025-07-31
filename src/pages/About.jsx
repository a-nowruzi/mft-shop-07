import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

export default function About() {
  const [likes, setLikes] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h1 className="h3 mb-0">درباره ما</h1>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="h4 text-muted">خوش آمدید به فروشگاه آنلاین ما</h2>
                <p className="lead">
                  ما متعهد به ارائه بهترین محصولات و خدمات به مشتریان خود هستیم.
                </p>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <h3 className="h5">مزایای ما</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Badge bg="success" className="me-2">✓</Badge>
                      کیفیت بالا
                    </li>
                    <li className="mb-2">
                      <Badge bg="success" className="me-2">✓</Badge>
                      قیمت مناسب
                    </li>
                    <li className="mb-2">
                      <Badge bg="success" className="me-2">✓</Badge>
                      ارسال سریع
                    </li>
                    <li className="mb-2">
                      <Badge bg="success" className="me-2">✓</Badge>
                      پشتیبانی 24/7
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h3 className="h5">آمار</h3>
                  <div className="text-center">
                    <div className="display-6 text-primary fw-bold">1000+</div>
                    <small className="text-muted">مشتری راضی</small>
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <Button 
                  onClick={handleLike}
                  variant="outline-primary" 
                  size="lg"
                  className="me-3"
                  data-testid="like-button"
                >
                  👍 پسندیدم ({likes})
                </Button>
                <Button 
                  onClick={toggleDetails}
                  variant="outline-secondary" 
                  size="lg"
                  data-testid="toggle-details-button"
                >
                  {showDetails ? 'مخفی کردن جزئیات' : 'نمایش جزئیات'}
                </Button>
              </div>

              {showDetails && (
                <div className="mt-4 p-3 bg-light rounded" data-testid="details-section">
                  <h4 className="h6">جزئیات بیشتر</h4>
                  <p className="mb-2">
                    این فروشگاه در سال 2024 تأسیس شده و با بیش از 5 سال تجربه در زمینه فروش آنلاین، 
                    یکی از معتبرترین فروشگاه‌های اینترنتی در کشور است.
                  </p>
                  <p className="mb-0">
                    ما با تیمی متخصص و حرفه‌ای، آماده ارائه بهترین خدمات به شما عزیزان هستیم.
                  </p>
                </div>
              )}

              <div className="text-center mt-4">
                <small className="text-muted">
                  © 2024 فروشگاه آنلاین. تمامی حقوق محفوظ است.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 