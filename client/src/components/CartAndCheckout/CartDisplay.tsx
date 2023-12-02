import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../middleware/CartContext";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
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
type PriceType = {
  amount: string;
  gst: string;
  total: string;
};

function CartDisplay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCartWithUser, removeProduct } = useCart();
  const [price, setPrice] = useState<PriceType | null>(null);
  const [productData, setProductData] = useState<CartProductType[] | null>(
    null
  );

  const handleAdding = async (id: string) => {
    await addToCartWithUser(`${id}`);
    if (productData) {
      const updatedProductData = productData.map((product) => {
        if (product.id === id) {
          product.count = product.count + 1;
        }
        return product;
      });
      setProductData(updatedProductData);
    }
  };

  const handleMinus = async (id: string) => {
    await removeProduct(`${id}`);
    if (productData) {
      const updatedProductData = productData.map((product) => {
        if (product.id === id && product.count >= 1) {
          product.count = product.count - 1;
        }
        return product;
      });
      setProductData(updatedProductData);
    }
  };

  useEffect(() => {
    const fetchCartData = async (id: string) => {
      const res = await fetch(`${API_URL}/api/cart/${id}`);
      const data = await res.json();

      const productPromises = await data.product.map(async (id: string) => {
        const res = await fetch(`${API_URL}/api/products/id/${id}`);
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

  useEffect(() => {
    const updatedPrice = async () => {
      let amount = productData
        ?.reduce((total, item) => {
          if (item.sale) {
            total += item.count * item.salePrice;
          } else {
            total += item.count * item.price;
          }
          return total;
        }, 0)
        .toFixed(2);

      if (amount) {
        let gst = ((Number(amount) * 10) / 100).toFixed(2);
        let total = (Number(amount) * 1.1).toFixed(2);
        setPrice({
          amount,
          gst,
          total,
        });
      }
    };
    updatedPrice();
  }, [productData]);

  return (
    <div className="d-flex flex-column  my-4 mx-5 shopping-cart">
      <h2 className="cart-header ">My Cart</h2>
      {productData && productData.length ? (
        productData.map((product) => {
          if (product.count > 0) {
            return (
              <div
                key={product.id}
                className="d-flex flex-row  justify-content-between py-2 px-3 cart-container"
              >
                <div className="d-flex flex-row  gap-5 cart-sub-container">
                  <img
                    src={product.imgURL}
                    alt="product"
                    className="cart-img img-fluid"
                  />
                  <div className="d-flex flex-column align-self-center">
                    <h4 onClick={() => navigate(`/product/${product.id}`)}>
                      {product.name}
                    </h4>

                    {product.sale ? (
                      <p className="text-danger">
                        Sale Price:${product.salePrice.toFixed(2)}
                      </p>
                    ) : (
                      <p>${product.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
                <div className=" d-flex flex-row align-self-center amount-container">
                  {" "}
                  <button
                    onClick={() => {
                      handleAdding(`${product.id}`);
                    }}
                  >
                    +
                  </button>
                  <span className="px-1">{product.count}</span>
                  <button
                    onClick={() => {
                      handleMinus(`${product.id}`);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className="tips">Nothing in your cart yet.</div>
      )}
      {productData && productData.length ? (
        <div className="d-flex flex-column justify-content-end align-items-end px-2">
          <p>Amount: ${price && price.amount}</p>
          <p>GST: ${price && price.gst}</p>
          <p>Total: ${price && price.total}</p>

          <button
            onClick={() => {
              navigate(`/checkout/${id}`, {
                state: { productData: productData, price: price },
              });
            }}
            className="btn custom-button "
          >
            Check out
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CartDisplay;
