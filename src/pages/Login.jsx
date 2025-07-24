import { useForm } from 'react-hook-form';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // استفاده از React Hook Form
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();

  // تابع ارسال فرم
  const onSubmit = async (data) => {
    try {
      console.log('داده‌های فرم:', data);
      
      // ارسال درخواست به API
      const response = await axios.post('https://nowruzi.top/api/User/Login', {
        mobile: data.mobile,
        password: data.password
      });

      // بررسی پاسخ موفق
      if (response.data.isSuccess) {
        // ذخیره اطلاعات کاربر در localStorage
        localStorage.setItem('userId', response.data.data.id);
        localStorage.setItem('fullName', response.data.data.fullName);
        
        // نمایش پیام موفقیت
        toast.success(response.data.message || 'ورود با موفقیت انجام شد');
        
        // پاک کردن فرم
        setValue('mobile', '');
        setValue('password', '');
        
        // اینجا می‌توانید کاربر را به صفحه اصلی هدایت کنید
        navigate('/');
        
      } else {
        // نمایش پیام خطا از سرور
        toast.error(response.data.message || 'خطا در ورود');
      }
      
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      
      // نمایش پیام خطا
      if (error.response) {
        // خطای پاسخ از سرور
        toast.error(error.response.data?.message || 'خطا در ارتباط با سرور');
      }  else {
        // خطای دیگر
        toast.error('خطای غیرمنتظره رخ داد');
      }
    }
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
