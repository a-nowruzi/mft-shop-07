import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get('https://nowruzi.top/api/Product')
      .then(res => {
        if (res.data.isSuccess) {
          setProducts(res.data.data.products);
        } else {
          setError(res.data.message || 'Failed to fetch products');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="form-container">Loading...</div>;
  if (error) return <div className="form-container form-fail">{error}</div>;

  return (
    <div className="product-list">
      {products.map(product => (
        <div
          className="product-card"
          key={product.id}
          onClick={() => navigate(`/details?id=${product.id}`)}
        >
          <img
            src={`https://nowruzi.top/${product.image}`}
            alt={product.title}
            className="product-image"
          />
          <div className="product-title">{product.title}</div>
          <div className="product-price">{product.price.toLocaleString()} تومان</div>
        </div>
      ))}
    </div>
  );
}
