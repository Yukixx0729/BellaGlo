import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { findUser } from "../../middleware/Auth";

type ProductData = {
  id: string;
  name: string;
  sale: boolean;
  price: number;
  salePrice: number;
  imgURL: string;
  description: string;
  count: number;
};

type Product = {
  productId: string;
};
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
function CheckOut() {
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const user = useUser();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const products: Product[] = [];
    location.state.productData.map((product: ProductData) => {
      if (product.count) products.push({ productId: product.id });
    });

    const orderDetails = Object.fromEntries(new FormData(e.currentTarget));
    orderDetails["products"] = JSON.stringify(products);
    if (location.state.price.total >= 99) {
      orderDetails["amount"] = Math.round(
        location.state.price.total * 100
      ).toString();
    } else {
      orderDetails["amount"] = Math.round(
        (Number(location.state.price.amount) + 15) * 1.1 * 100
      ).toString();
    }

    const { id } = user && user.user ? await findUser(`${user.user.id}`) : null;
    orderDetails["userId"] = id;

    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });
    const data = await res.json();
    console.log(data.id);
    if (res.status !== 201) {
      throw {
        status: res.status,
        message: data.message,
      };
    }

    if (formRef.current) {
      formRef.current.reset();
    }

    const payRes = await fetch(`${API_URL}/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: orderDetails["amount"],
        orderId: data.id,
      }),
    });
    const payData = await payRes.json();
    window.location.href = payData.url;
  };

  return (
    <div className="d-flex flex-column  my-4 mx-5 ">
      <div>
        <div className="order-container ">
          <h2>Order details</h2>
          {location.state.productData &&
            location.state.productData.map((product: ProductData) => {
              if (product.count)
                return (
                  <div key={product.id}>
                    <div className="d-flex flex-row  gap-5 cart-container">
                      <img
                        src={product.imgURL}
                        alt="product"
                        className="cart-img img-fluid"
                      />
                      <div className="d-flex flex-column align-self-center cart-sub-container">
                        <p>
                          {" "}
                          <span className="px-1">{product.count} X </span>
                          {product.name}
                        </p>

                        {product.sale ? (
                          <p className="text-danger">
                            Sale Price:${product.salePrice.toFixed(2)} ea.
                          </p>
                        ) : (
                          <p>${product.price.toFixed(2)} ea.</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
            })}
          {location.state.price && location.state.price.amount >= 99 ? (
            <div className="d-flex flex-column justify-content-end align-items-end px-2">
              {" "}
              <p>Amount: ${location.state.price.amount}</p>
              <p>GST: ${location.state.price.gst}</p>
              <p>Total: ${location.state.price.total}</p>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-end align-items-end px-2">
              {" "}
              <p>Amount: ${location.state.price.amount}</p>
              <p>Delivery: $15.00</p>
              <p>
                GST: $
                {((Number(location.state.price.amount) + 15) * 0.1).toFixed(2)}
              </p>
              <p>
                Total: $
                {((Number(location.state.price.amount) + 15) * 1.1).toFixed(2)}
              </p>
            </div>
          )}
        </div>
        <div className="form-container my-2 ">
          <form
            className="d-flex flex-column justify-content-center align-items-center px-2"
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <div>
              <label className="form-label">Recevier Name: </label>
              <input type="text" name="name" className="form-control" />
            </div>
            <div>
              <label className="form-label">Recevier Address</label>
              <input type="text" name="address" className="form-control" />
            </div>
            <div>
              <label className="form-label">Recevier Phone</label>
              <input type="text" name="phone" className="form-control" />
            </div>
            <div>
              {" "}
              <label className="form-label">Note:</label>
              <input type="text" name="note" className="form-control" />
            </div>

            <button type="submit" className="btn custom-button mb-3">
              Comfirm and Pay{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
