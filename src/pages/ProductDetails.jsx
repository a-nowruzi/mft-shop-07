import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Badge, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import useCartStore from '../hooks/CartStore';

export default function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartLoading, setCartLoading] = useState(false);
    
    const addToCart = useCartStore(x => x.addToCart);
    const removeFromCart = useCartStore(x => x.removeFromCart);

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const userId = localStorage.getItem('userId');
            const url = userId 
                ? `https://nowruzi.top/api/Product/GetProductById?productId=${productId}&userId=${userId}`
                : `https://nowruzi.top/api/Product/GetProductById?productId=${productId}`;
            
            const response = await axios.get(url);
            
            if (response.data.isSuccess) {
                setProduct(response.data.data);
            } else {
                setError(response.data.message || 'خطا در دریافت اطلاعات محصول');
            }
        } catch (error) {
            console.error('خطا در دریافت اطلاعات محصول:', error);
            setError('خطا در ارتباط با سرور');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;
        
        setCartLoading(true);
        const success = await addToCart(product.id);
        if (success) {
            // Refresh product data to get updated cart quantity
            await fetchProductDetails();
        }
        setCartLoading(false);
    };

    const handleRemoveFromCart = async () => {
        if (!product) return;
        
        setCartLoading(true);
        const success = await removeFromCart(product.id);
        if (success) {
            // Refresh product data to get updated cart quantity
            await fetchProductDetails();
        }
        setCartLoading(false);
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">در حال بارگذاری...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <Alert variant="danger">
                    <Alert.Heading>خطا</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={() => navigate('/')}>
                        بازگشت به صفحه اصلی
                    </Button>
                </Alert>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mt-5">
                <Alert variant="warning">
                    <Alert.Heading>محصول یافت نشد</Alert.Heading>
                    <p>محصول مورد نظر یافت نشد.</p>
                    <Button variant="outline-warning" onClick={() => navigate('/')}>
                        بازگشت به صفحه اصلی
                    </Button>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <Row>
                <Col lg={6} md={6} sm={12}>
                    {/* تصویر محصول */}
                    <Card className="border-0 shadow-sm">
                        <Card.Img
                            variant="top"
                            src={`https://nowruzi.top/${product.image}`}
                            style={{ 
                                height: '400px', 
                                objectFit: 'contain',
                                backgroundColor: '#f8f9fa'
                            }}
                            className="p-3"
                        />
                    </Card>
                </Col>
                
                <Col lg={6} md={6} sm={12}>
                    <div className="ps-md-4">
                        {/* عنوان محصول */}
                        <h1 className="mb-3">{product.title}</h1>
                        
                        {/* قیمت */}
                        <div className="mb-4">
                            <h2 className="text-primary fw-bold">
                                {product.price.toLocaleString('fa-IR')} تومان
                            </h2>
                        </div>
                        
                        {/* تعداد در سبد خرید */}
                        {product.cartQuantity > 0 && (
                            <div className="mb-4">
                                <Badge bg="success" className="fs-6 p-2">
                                    تعداد در سبد خرید: {product.cartQuantity}
                                </Badge>
                            </div>
                        )}
                        
                        {/* توضیحات */}
                        {product.description && (
                            <div className="mb-4">
                                <h5>توضیحات:</h5>
                                <p className="text-muted">{product.description}</p>
                            </div>
                        )}
                        
                        {/* دکمه‌های عملیات */}
                        <div className="mb-4">
                            {product.cartQuantity > 0 ? (
                                <Row>
                                    <Col lg={6} md={6} sm={12}>
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-100 mb-2"
                                            onClick={handleAddToCart}
                                            disabled={cartLoading}>
                                            {cartLoading ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />
                                                    در حال پردازش...
                                                </>
                                            ) : (
                                                'افزودن بیشتر'
                                            )}
                                        </Button>
                                    </Col>
                                    <Col lg={6} md={6} sm={12}>
                                        <Button
                                            variant="danger"
                                            size="lg"
                                            className="w-100 mb-2"
                                            onClick={handleRemoveFromCart}
                                            disabled={cartLoading}>
                                            {cartLoading ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />
                                                    در حال پردازش...
                                                </>
                                            ) : (
                                                'حذف از سبد خرید'
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                            ) : (
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-100 mb-2"
                                    onClick={handleAddToCart}
                                    disabled={cartLoading}>
                                    {cartLoading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            در حال پردازش...
                                        </>
                                    ) : (
                                        'افزودن به سبد خرید'
                                    )}
                                </Button>
                            )}
                        </div>
                        
                        {/* دکمه بازگشت */}
                        <Button
                            variant="outline-secondary"
                            onClick={() => navigate('/')}
                            className="w-100">
                            بازگشت به صفحه اصلی
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
} 