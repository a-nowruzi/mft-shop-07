import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import useCartStore from '../hooks/CartStore';

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryName, setCategoryName] = useState('');
  
  const addToCart = useCartStore(x => x.addToCart);
  const updateQuantity = useCartStore(x => x.updateQuantity);

  // دریافت محصولات دسته‌بندی
  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get(`https://nowruzi.top/api/Product/GetProducts?CategoryId=${categoryId}`);
      
      if (response.data.isSuccess) {
        setProducts(response.data.data.products);
        if (response.data.data.products.length > 0) {
          setCategoryName(response.data.data.products[0].categoryName);
        }
      } else {
        setError(response.data.message || 'خطا در دریافت محصولات');
        setProducts([]);
      }
    } catch (error) {
      console.error('خطا در دریافت محصولات دسته‌بندی:', error);
      setError('خطا در اتصال به سرور');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // اضافه کردن محصول به سبد خرید
  const handleAddToCart = (product) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('لطفاً ابتدا وارد حساب کاربری خود شوید');
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      categoryName: product.categoryName
    });
  };

  // افزایش تعداد محصول در سبد خرید
  const handleIncreaseQuantity = (productId) => {
    updateQuantity(productId, 1);
  };

  // کاهش تعداد محصول در سبد خرید
  const handleDecreaseQuantity = (productId) => {
    updateQuantity(productId, -1);
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategoryProducts();
    }
  }, [categoryId]);

  // فرمت کردن قیمت
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">در حال بارگذاری...</span>
          </Spinner>
          <p className="mt-3">در حال بارگذاری محصولات...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>خطا!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1 className="text-center mb-3">محصولات {categoryName}</h1>
        <p className="text-center text-muted">
          {products.length} محصول در این دسته‌بندی یافت شد
        </p>
      </div>

      {products.length === 0 ? (
        <Alert variant="info" className="text-center">
          <Alert.Heading>محصولی یافت نشد!</Alert.Heading>
          <p>در حال حاضر محصولی در این دسته‌بندی موجود نیست.</p>
        </Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} lg={4} md={6} sm={12} className="mb-4">
              <Card className="h-100 shadow-sm">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={`https://nowruzi.top/${product.image}`}
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=تصویر+موجود+نیست';
                    }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">{product.categoryName}</span>
                  </div>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center mb-2">{product.title}</Card.Title>
                  <Card.Text className="text-muted text-center mb-3">
                    {product.description}
                  </Card.Text>
                  
                  <div className="text-center mb-3">
                    <h5 className="text-primary fw-bold">{formatPrice(product.price)}</h5>
                  </div>

                  <div className="mt-auto">
                    {product.cartQuantity > 0 ? (
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleDecreaseQuantity(product.id)}
                        >
                          -
                        </Button>
                        <span className="fw-bold">{product.cartQuantity}</span>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleIncreaseQuantity(product.id)}
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={() => handleAddToCart(product)}
                      >
                        افزودن به سبد خرید
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
} 