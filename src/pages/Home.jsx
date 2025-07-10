import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://nowruzi.top/api/Product')
      .then(res => {
        if (res.data.isSuccess) {
          setProducts(res.data.data.products);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="form-container">Loading...</div>;

  return (
    <div className="product-list">
      {products.map(product => (
        <div
          className="product-card"
          key={product.id}
          onClick={e => {
            // Prevent navigation if add to cart button is clicked
            if (e.target.closest('.add-cart-btn')) return;
            navigate(`/details?id=${product.id}`)
          }}
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
