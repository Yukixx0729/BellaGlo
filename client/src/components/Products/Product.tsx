import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../middleware/CartContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { findUser } from "../../middleware/Auth";
import { List } from "../Account/MySaved";

type ProductType = {
  id: string;
  name: string;
  sale: boolean;
  price: number;
  salePrice: number;
  imgURL: string;
};
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
function Products() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const { addToCartWithUser } = useCart();
  const { type } = useParams();
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [favList, setFavList] = useState<List[] | null>(null);
  useEffect(() => {
    const getAllProducts = async (type: string) => {
      try {
        setIsPending(true);
        if (type === "sale") {
          const res = await fetch(`${API_URL}/api/products/sale`);
          const data = await res.json();

          setProducts(data);
        } else {
          const res = await fetch(`${API_URL}/api/products/type/${type}`);
          const data = await res.json();
          setProducts(data);
        }
        setIsPending(false);
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    };

    getAllProducts(`${type}`);
  }, []);
  const checkFavItems = async () => {
    if (user.user && user.user.id) {
      const userInfo = await findUser(`${user.user.id}`);
      if (userInfo.fav.length) {
        console.log(userInfo.fav[0].list);
        setFavList(userInfo.fav[0].list);
      }
    }
  };
  useEffect(() => {
    checkFavItems();
  }, [user.user]);

  const handleSavedItem = async (id: string) => {
    if (user.user && user.user.id) {
      const userInfo = await findUser(`${user.user.id}`);
      const data = { userId: userInfo.id, productId: id };
      if (userInfo.fav.length) {
        await fetch(`${API_URL}/api/fav`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`${API_URL}/api/fav`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      checkFavItems();
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <div>
      <div className="brand-type px-3 py-2 mt-3">
        <h2 className="py-2 px-3">BellaGlo.</h2>
        <h3 className="py-2 px-3">{type}</h3>
      </div>
      <div className="products d-flex flex-row gap-3 flex-wrap mx-4">
        {isPending && <p className="tips">Loading...</p>}
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
                  {favList &&
                  favList.filter((item) => {
                    return item.productId === product.id;
                  }).length ? (
                    <button className="btn custom-button" disabled>
                      Saved
                    </button>
                  ) : (
                    <button
                      className="btn custom-button"
                      onClick={() => handleSavedItem(`${product.id}`)}
                    >
                      Save the product
                    </button>
                  )}

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
