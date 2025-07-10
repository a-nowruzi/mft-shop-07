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

  React.useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    axios.get(`https://nowruzi.top/api/Product/${id}`)
      .then(res => {
        if (res.data.isSuccess) {
          setProduct(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="form-container">Loading...</div>;
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
