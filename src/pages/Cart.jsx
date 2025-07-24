import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Cart() {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);

    // دریافت اطلاعات سبد خرید
    const fetchCartData = async () => {
        try {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setError('برای مشاهده سبد خرید ابتدا وارد شوید');
                setLoading(false);
                return;
            }

            const response = await axios.get(`https://nowruzi.top/api/Cart/GetCart?userId=${userId}`);

            if (response.data.isSuccess) {
                setCartData(response.data.data);
            } else {
                toast.error(response.data.message || 'خطا در دریافت سبد خرید');
            }

        } catch (error) {
            console.error('خطا در دریافت سبد خرید:', error);

            if (error.response) {
                toast.error(error.response.data?.message || 'خطا در ارتباط با سرور');
            } else if (error.request) {
                toast.error('خطا در اتصال به سرور');
            } else {
                toast.error('خطای غیرمنتظره رخ داد');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">در حال بارگذاری سبد خرید...</p>
                </div>
            </Container>
        );
    }

    if (!cartData || cartData.items.length === 0) {
        return (
            <Container className="mt-5">
                <Card className="text-center">
                    <Card.Body className="py-5">
                        <h4>سبد خرید شما خالی است</h4>
                        <p className="text-muted">هنوز هیچ محصولی به سبد خرید اضافه نکرده‌اید</p>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            بازگشت به فروشگاه
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">سبد خرید</h2>

            {/* لیست محصولات */}
            <Row>
                <Col lg={8}>
                    {
                        cartData.items.map((item) => (
                            <Card key={item.id} className="mb-3">
                                <Card.Body>
                                    <Row className="align-items-center">
                                        <Col md={3}>
                                            <img
                                                src={'https://nowruzi.top/' + item.productImage}
                                                alt={item.productTitle}
                                                className="img-fluid rounded"
                                                style={{ maxHeight: '100px', objectFit: 'cover' }}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <h5>{item.productTitle}</h5>
                                            <p className="text-muted small">{item.productDescription}</p>
                                            <div className="d-flex align-items-center gap-3">
                                                <Badge bg="secondary">تعداد: {item.quantity}</Badge>
                                            </div>
                                        </Col>
                                        <Col md={3} className="text-end">
                                            <div className="mb-2">
                                                <strong className="text-primary">
                                                    {(item.totalPrice).toLocaleString('fa-IR') + ' تومان'}
                                                </strong>
                                            </div>
                                            <div className="mb-2">
                                                <small className="text-muted">
                                                    قیمت واحد: {(item.productPrice).toLocaleString('fa-IR') + ' تومان'}
                                                </small>
                                            </div>
                                            <Button variant="outline-danger" size="sm">
                                                حذف
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}
                </Col>

                {/* خلاصه سبد خرید */}
                <Col lg={4}>
                    <Card className="sticky-top" style={{ top: '20px' }}>
                        <Card.Header>
                            <h5 className="mb-0">خلاصه سفارش</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex justify-content-between mb-2">
                                <span>تعداد کل:</span>
                                <strong>{cartData.totalItems} عدد</strong>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span>مجموع کل:</span>
                                <strong className="text-primary fs-5">
                                    {(cartData.totalPrice).toLocaleString('fa-IR') + ' تومان'}
                                </strong>
                            </div>
                            <Button variant="success" className="w-100 mb-2">
                                تکمیل سفارش
                            </Button>
                            <Button variant="outline-secondary" className="w-100" onClick={() => navigate('/')}>
                                ادامه خرید
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
} 