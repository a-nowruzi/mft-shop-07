import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Card, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Locations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    // تابع دریافت مکان‌ها از API
    const fetchLocations = async () => {
        try {
            setLoading(true);

            const response = await axios.get('https://nowruzi.top/api/Location/GetLocations');

            if (response.data.isSuccess) {
                setLocations(response.data.data);
            } else {
                toast.error('خطا در دریافت مکان‌ها');
            }
        } catch (error) {
            console.error('خطا در دریافت مکان‌ها:', error);
            toast.error('خطا در اتصال به سرور');
        } finally {
            setLoading(false);
        }
    };

    // دریافت مکان‌ها در زمان بارگذاری کامپوننت
    useEffect(() => {
        fetchLocations();
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
        <Container fluid className="py-4">
            <Row>
                <Col lg={8} md={12} className="mb-4">
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h4 className="mb-0">نقشه مکان‌های فروش</h4>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div style={{ height: '600px', width: '100%' }}>
                                <MapContainer
                                    center={[35.6892, 51.389]}
                                    zoom={11}
                                    style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                                    {
                                        locations.map((location, index) => (
                                            <Marker
                                                key={index}
                                                position={[location.latitude, location.longitude]}>
                                            </Marker>
                                        ))}
                                </MapContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} md={12}>
                    <Card>
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">لیست مکان‌ها</h5>
                            <Badge bg="light" text="dark" className="ms-2">
                                {locations.length} مکان
                            </Badge>
                        </Card.Header>
                        <Card.Body style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {
                                locations.map((location, index) => (
                                    <Card
                                        key={index}
                                        className={`mb-3 cursor-pointer`}
                                        style={{ cursor: 'pointer' }}>
                                        <Card.Body>
                                            <h6 className="fw-bold mb-2">{location.name}</h6>
                                            <p className="text-muted mb-2">{location.description}</p>
                                            <div className="d-flex justify-content-between">
                                                <small className="text-muted">
                                                    عرض: {location.latitude.toFixed(4)}
                                                </small>
                                                <small className="text-muted">
                                                    طول: {location.longitude.toFixed(4)}
                                                </small>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
} 