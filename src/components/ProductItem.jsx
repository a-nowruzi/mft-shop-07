import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../hooks/CartStore';
import { useState } from 'react';

export default function ProductItem({ product }) {

    const [count, setCount] = useState(0);
    const addToCart = useCartStore(x => x.incrementTotalCount);
    const removeFromCart = useCartStore(x => x.decrementTotalCount);

    function handleAddToCart() {
        addToCart();
        setCount(count + 1);
    }

    function handleRemoveFromCart() {
        removeFromCart();
        setCount(count - 1);
    }

    const navigate = useNavigate();

    const formatPrice = (price) => {
        return price.toLocaleString('fa-IR') + ' تومان';
    };

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
                    {formatPrice(product.price)}
                </Card.Text>

                {/* دکمه‌های عملیات */}
                <div className="mt-auto">
                    <Row>
                        <Col lg={5} md={5} sm={12}>
                            <Button
                                variant="primary"
                                className="w-100 mb-2"
                                onClick={handleAddToCart}>
                                افزودن به سبد خرید
                            </Button>
                        </Col>
                        <Col lg={2} md={2} sm={12}>
                            <span className="text-muted">
                                تعداد: {count}
                            </span>
                        </Col>
                        {count > 0 && (
                            <Col lg={5} md={5} sm={12}>
                                <Button
                                    variant="danger"
                                    className="w-100 mb-2"
                                    onClick={handleRemoveFromCart}>
                                    حذف از سبد خرید
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