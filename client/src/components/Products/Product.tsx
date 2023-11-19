import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../middleware/CartContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

type ProductType = {
  id: number;
  name: string;
  sale: boolean;
  price: number;
  salePrice: number;
  imgURL: string;
};

function Products() {
  const navigate = useNavigate();
  const user = useUser();
  const { addToCartWithUser } = useCart();
  const { type } = useParams();
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    const getAllProducts = async (type: string) => {
      try {
        if (type === "sale") {
          const res = await fetch(`http://localhost:3000/api/products/sale`);
          const data = await res.json();

          setProducts(data);
        } else {
          const res = await fetch(
            `http://localhost:3000/api/products/type/${type}`
          );
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    };
    getAllProducts(`${type}`);
  }, []);

  return (
    <div>
      <div className="brand-type px-3 py-2 mt-3">
        <h2 className="py-2 px-3">BellaGlo.</h2>
        <h3 className="py-2 px-3">{type}</h3>
      </div>
      <div className="products d-flex flex-row gap-3 flex-wrap mx-4">
        {products &&
          products.map((product) => {
            return (
              <div className="card product-container my-4 " key={product.id}>
                <img
                  src={product.imgURL}
                  className="card-img-top img-thumbnail"
                  alt="product img"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <div className="card-body d-flex justify-content-between flex-column gap-2">
                  <h5
                    className="card-title fs-4"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h5>
                  {product.sale ? (
                    <div>
                      <p className="text-end fs-5 card-text">
                        <span className="text-danger px-2">
                          ${product.salePrice}
                        </span>
                        <span className="card-text text-decoration-line-through ">
                          ${product.price}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="card-text text-end fs-5 ">
                        <span className="px-2">${product.price}</span>
                      </p>
                    </div>
                  )}

                  <button className="btn custom-button">
                    Save the product
                  </button>
                  <button
                    className="btn custom-button"
                    onClick={async () => {
                      user.isSignedIn
                        ? await addToCartWithUser(`${`${product.id}`}`)
                        : navigate("/sign-in");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
