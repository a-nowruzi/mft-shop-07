import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../hooks/CartStore';
import { useState } from 'react';

export default function ProductItem({ product }) {
    const [loading, setLoading] = useState(false);
    const addToCart = useCartStore(x => x.addToCart);
    const removeFromCart = useCartStore(x => x.removeFromCart);
    const [count, setCount] = useState(product.cartQuantity);

    async function handleAddToCart() {
        setLoading(true);
        await addToCart(product.id);
        setCount(count + 1);
        setLoading(false);
    }

    async function handleRemoveFromCart() {
        setLoading(true);
        await removeFromCart(product.id);
        setCount(count - 1);
        setLoading(false);
    }

    const navigate = useNavigate();

    return (
        <Card className="h-100 shadow">
            {/* تصویر محصول */}
            <Card.Img
                variant="top"
                src={`https://nowruzi.top/${product.image}`}
                style={{ height: 200, objectFit: 'contain' }}
            />

            <Card.Body className="d-flex flex-column">
                {/* عنوان محصول */}
                <Card.Title>{product.title}</Card.Title>

                {/* قیمت */}
                <Card.Text className="fw-bold text-primary fs-5">
                    {(product.price).toLocaleString('fa-IR') + ' تومان'}
                </Card.Text>

                {/* تعداد در سبد خرید */}
                {count > 0 && (
                    <div className="mb-3">
                        <Badge bg="success" className="fs-6">
                            تعداد در سبد خرید: {count}
                        </Badge>
                    </div>
                )}

                {/* دکمه‌های عملیات */}
                <div className="mt-auto">
                    <Row>
                        {count > 0 ? (
                            <>
                                <Col lg={6} md={6} sm={12}>
                                    <Button
                                        variant="primary"
                                        className="w-100 mb-2"
                                        onClick={handleAddToCart}
                                        disabled={loading}>
                                        {loading ? 'در حال پردازش...' : 'افزودن بیشتر'}
                                    </Button>
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                    <Button
                                        variant="danger"
                                        className="w-100 mb-2"
                                        onClick={handleRemoveFromCart}
                                        disabled={loading}>
                                        {loading ? 'در حال پردازش...' : 'حذف از سبد خرید'}
                                    </Button>
                                </Col>
                            </>
                        ) : (
                            <Col lg={12} md={12} sm={12}>
                                <Button
                                    variant="primary"
                                    className="w-100 mb-2"
                                    onClick={handleAddToCart}
                                    disabled={loading}>
                                    {loading ? 'در حال پردازش...' : 'افزودن به سبد خرید'}
                                </Button>
                            </Col>
                        )}
                    </Row>
                    <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={() => navigate(`/product-details/${product.id}`)}>
                        مشاهده جزئیات
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
} 