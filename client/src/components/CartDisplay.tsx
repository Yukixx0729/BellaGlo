import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type CartProductType = {
  id: string;
  name: string;
  sale: boolean;
  price: number;
  salePrice: number;
  imgURL: string;
  description: string;
  count: number;
};

function CartDisplay() {
  const { id } = useParams();
  const [productData, setProductData] = useState<CartProductType[] | null>(
    null
  );

  const handleAdding = async () => {};
  const handleMinus = async () => {};
  const handleCheckout = async () => {};

  useEffect(() => {
    const fetchCartData = async (id: string) => {
      const res = await fetch(`http://localhost:3000/api/cart/${id}`);
      const data = await res.json();

      const productPromises = await data.product.map(async (id: string) => {
        const res = await fetch(`http://localhost:3000/api/products/id/${id}`);
        const data = await res.json();
        return data;
      });
      const productResults = await Promise.all(productPromises);
      let sortedProduct: CartProductType[] = [];
      productResults.forEach((product) => {
        const existingProduct = sortedProduct.find(
          (item) => item.id === product.id
        );
        if (existingProduct) {
          console.log(sortedProduct.find((item) => item.id === product.id));
          existingProduct.count += 1;
        } else {
          sortedProduct.push({
            id: product.id,
            name: product.name,
            sale: product.sale,
            price: product.price,
            salePrice: product.salePrice,
            imgURL: product.imgURL,
            description: product.description,
            count: 1,
          });
        }
      });
      setProductData(sortedProduct);
    };
    fetchCartData(`${id}`);
  }, []);

  return (
    <div className="d-flex flex-column mx-5 my-4">
      <h2 className="cart-header">My Cart</h2>
      {productData &&
        productData.map((product) => {
          return (
            <div key={product.id} className="d-flex flex-row  gap-2 py-2">
              <img
                src={product.imgURL}
                alt="product"
                className="cart-img img-fluid"
              />
              <div className="d-flex flex-column align-self-center">
                <p>{product.name}</p>

                {product.sale ? (
                  <p className="text-danger">Sale Price:${product.salePrice}</p>
                ) : (
                  <p>${product.price}</p>
                )}

                <p>{product.description}</p>
              </div>
              <div className="flex-fill d-flex flex-row align-items-center">
                {" "}
                <button onClick={handleAdding}>+</button>
                <span className="px-1">{product.count}</span>
                <button onClick={handleMinus}>-</button>
              </div>
            </div>
          );
        })}
      <div className="d-flex flex-column justify-content-end align-items-end ">
        <p>Amount: $999.00</p>
        <p>GST: $99.00</p>
        <p>Total: $199.00</p>
        <button
          onClick={handleCheckout}
          className="btn btn-outline-primary btn-lg"
        >
          Check out
        </button>
      </div>
    </div>
  );
}

export default CartDisplay;
