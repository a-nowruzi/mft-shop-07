import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ProductItem from '../components/ProductItem';

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

  // هندلرهای سبد خرید (نمونه اولیه)
  const handleAddToCart = (product) => {
    // TODO: افزودن به سبد خرید
    toast.success('محصول به سبد خرید اضافه شد');
  };
  const handleRemoveFromCart = (productId) => {
    // TODO: حذف از سبد خرید
    toast.info('محصول از سبد خرید حذف شد');
  };
  const handleViewDetails = (productId) => {
    // TODO: نمایش جزئیات
    toast('نمایش جزئیات محصول: ' + productId);
  };

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
              <ProductItem
                product={product}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onViewDetails={handleViewDetails}
                isInCart={false} // فعلاً مقدار ثابت
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
