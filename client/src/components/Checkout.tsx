import { useLocation, useParams } from "react-router-dom";
import { useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { findUser } from "../middleware/Auth";

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

type OrderDetails = {
  userId: string;
  amount: string;
  address: string;
  number: string;
  name: string;
  phone: string;
  note: string;
  products: Product[];
};

type Product = {
  productId: string;
};

function CheckOut() {
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const user = useUser();
  const { cartId } = useParams();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const products: Product[] = [];
    location.state.productData.map((product: ProductData) =>
      products.push({ productId: product.id })
    );

    const orderDetails = Object.fromEntries(new FormData(e.currentTarget));
    orderDetails["products"] = products;
    orderDetails["amount"] = Number(location.state.price.total);
    const { id } = await findUser(`${user.user.id}`);
    orderDetails["userId"] = id;
    console.log(orderDetails);
    const res = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });
    const data = await res.json();

    if (res.status !== 201) {
      throw {
        status: res.status,
        message: data.message,
      };
    }

    if (formRef.current) {
      formRef.current.reset();
    }

    const payRes = await fetch(
      `http://localhost:3000/api/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: orderDetails["amount"], cartId: cartId }),
      }
    );
    const payData = await payRes.json();
    console.log(payData);
    window.location.href = payData.url;
  };

  return (
    <div className="d-flex flex-column  my-4 mx-5 ">
      <h2>Order details</h2>
      <div>
        <div className="order-container">
          {location.state.productData &&
            location.state.productData.map((product: ProductData) => {
              if (product.count)
                return (
                  <div key={product.id}>
                    <div className="d-flex flex-row  gap-5">
                      <img
                        src={product.imgURL}
                        alt="product"
                        className="cart-img img-fluid"
                      />
                      <div className="d-flex flex-column align-self-center">
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
          {location.state.price && (
            <div className="d-flex flex-column justify-content-end align-items-end px-2">
              {" "}
              <p>
                Amount: ${location.state.price && location.state.price.amount}
              </p>
              <p>GST: ${location.state.price && location.state.price.gst}</p>
              <p>
                Total: ${location.state.price && location.state.price.total}
              </p>
            </div>
          )}
        </div>
        <div className="form-container my-2">
          <form
            className="d-flex flex-column justify-content-center align-items-center px-2"
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <h3 className="py-2">Delivery Details</h3>
            <div>
              <label>Recevier Name: </label>
              <input type="text" name="name" />
            </div>
            <div>
              <label>Recevier Address</label>
              <input type="text" name="address" />
            </div>
            <div>
              <label>Recevier Phone</label>
              <input type="text" name="phone" />
            </div>
            <div>
              {" "}
              <label>Note:</label>
              <input type="text" name="note" />
            </div>

            <button type="submit">Comfirm and Pay </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
