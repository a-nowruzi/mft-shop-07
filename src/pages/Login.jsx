import { useForm } from 'react-hook-form';
import { Container, Form, Button, Card } from 'react-bootstrap';

export default function Login() {
  // استفاده از React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // تابع ارسال فرم
  const onSubmit = (data) => {
    console.log('داده‌های فرم:', data);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow" style={{ width: '400px' }}>
        
        {/* هدر کارت */}
        <Card.Header className="text-center bg-primary text-white">
          <h4 className="mb-0">فرم ورود</h4>
        </Card.Header>
        
        {/* بدنه کارت */}
        <Card.Body className="p-4">
          
          {/* فرم */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            {/* فیلد شماره موبایل */}
            <Form.Group className="mb-3">
              <Form.Label>شماره موبایل</Form.Label>
              <Form.Control
                type="text"
                {...register('mobile', { 
                  required: 'شماره موبایل الزامی است' 
                })}
                isInvalid={errors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobile?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* فیلد رمز عبور */}
            <Form.Group className="mb-3">
              <Form.Label>رمز عبور</Form.Label>
              <Form.Control
                type="password"
                {...register('password', { 
                  required: 'رمز عبور الزامی است' 
                })}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* دکمه ارسال */}
            <div className="mt-5">
              <Button
                variant="primary"
                type="submit"
                className="w-100">
                ورود
              </Button>
            </div>
            
          </Form>
          
        </Card.Body>
      </Card>
    </Container>
  );
}
