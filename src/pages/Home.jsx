import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Home() {
  // state برای نگهداری محصولات و وضعیت loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // تابع دریافت محصولات از API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://nowruzi.top/api/Product');

      if (response.data.isSuccess) {
        setProducts(response.data.data.products);
      } else {
        toast.error('خطا در دریافت محصولات');
      }
    } catch (error) {
      console.error('خطا در دریافت محصولات:', error);
      setError('خطا در اتصال به سرور');
    } finally {
      setLoading(false);
    }
  };

  // دریافت محصولات در زمان بارگذاری کامپوننت
  useEffect(() => {
    fetchProducts();
  }, []);

  // تابع تبدیل قیمت به فرمت قابل خواندن
  const formatPrice = (price) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  // نمایش loading
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-4">

      {/* نمایش محصولات */}
      <Row>
        {
          products.map((product) => (
            <Col key={product.id} lg={4} md={6} sm={12} className="mb-4">
              <Card className="h-100 shadow">
                {/* تصویر محصول */}
                <Card.Img
                  variant="top"
                  src={`https://nowruzi.top/${product.image}`}
                  style={{ height: '200px', objectFit: 'contain' }}
                />

                <Card.Body className="d-flex flex-column">
                  {/* عنوان محصول */}
                  <Card.Title>{product.title}</Card.Title>

                  {/* قیمت */}
                  <Card.Text className="fw-bold text-primary fs-5">
                    {formatPrice(product.price)}
                  </Card.Text>

                  {/* دکمه‌های عملیات */}
                  <div className="mt-auto">
                    <Button variant="primary" className="w-100 mb-2">
                      افزودن به سبد خرید
                    </Button>
                    <Button variant="outline-secondary" className="w-100">
                      مشاهده جزئیات
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
