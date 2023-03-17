import axios from 'axios';
import { useQuery } from 'react-query';

function Product() {
  const mallId =
    typeof window !== 'undefined' ? sessionStorage.getItem('mallId') : null;
  const accessToken =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;

  // const mallId = 'dkliraer';
  // const accessToken = 'xeDFGFSITSxPVYUIhMRFBF';

  const { data } = useQuery(
    ['products', mallId],
    async () =>
      await axios.get(`/api/product?token=${accessToken}&mallId=${mallId}`)
  );

  return (
    data && (
      <div>
        {data.data.products.map((product: any) => (
          <div key={product.product_name}>상품명 : {product.product_name}</div>
        ))}
      </div>
    )
  );
}

export default Product;
