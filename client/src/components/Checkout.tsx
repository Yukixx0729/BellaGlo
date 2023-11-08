import { useLocation } from "react-router-dom";

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

function CheckOut() {
  const location = useLocation();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="d-flex flex-column  my-4 mx-5 ">
      <h2>Order details</h2>
      <div>
        <div className="order-container">
          {location.state.productData &&
            location.state.productData.map((product: ProductData) => {
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
              <input type="text" name="number" />
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
