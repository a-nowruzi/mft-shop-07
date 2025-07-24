import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ProductItem from '../components/ProductItem';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // تابع دریافت محصولات از API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const userId = localStorage.getItem('userId');
      const url = userId 
        ? `https://nowruzi.top/api/Product/GetProducts?UserId=${userId}`
        : 'https://nowruzi.top/api/Product/GetProducts';

      const response = await axios.get(url);

      if (response.data.isSuccess) {
        setProducts(response.data.data.products);
      } else {
        toast.error('خطا در دریافت محصولات');
      }
    } catch (error) {
      console.error('خطا در دریافت محصولات:', error);
      toast.error('خطا در اتصال به سرور');
    } finally {
      setLoading(false);
    }
  };

  // دریافت محصولات در زمان بارگذاری کامپوننت
  useEffect(() => {
    fetchProducts();
  }, []);

  // نمایش لودینگ
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
              <ProductItem product={product} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
