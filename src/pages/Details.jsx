import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Details() {
  const query = useQuery();
  const id = query.get('id');
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!id) {
      setError('No product id provided');
      setLoading(false);
      return;
    }
    axios.get(`https://nowruzi.top/api/Product/${id}`)
      .then(res => {
        if (res.data.isSuccess) {
          setProduct(res.data.data);
        } else {
          setError(res.data.message || 'Failed to fetch product');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="form-container">Loading...</div>;
  if (error) return <div className="form-container form-fail">{error}</div>;
  if (!product) return null;

  return (
    <div className="details-container">
      <img
        src={`https://nowruzi.top/${product.image}`}
        alt={product.title}
        className="details-image"
      />
      <div className="details-title">{product.title}</div>
      <div className="details-desc">{product.description}</div>
      <div className="details-price">{product.price.toLocaleString()} تومان</div>
    </div>
  );
}
