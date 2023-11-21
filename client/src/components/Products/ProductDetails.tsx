import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../middleware/CartContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { findUser } from "../../middleware/Auth";
import { List } from "../Account/MySaved";

type ProductType = {
  id: number;
  name: string;
  sale: boolean;
  price: number;
  salePrice: number;
  imgURL: string;
  description: string;
  type: string;
};

function ProductDetail() {
  const navigate = useNavigate();
  const user = useUser();
  const [isFav, setIsFav] = useState(false);
  const { addToCartWithUser } = useCart();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  useEffect(() => {
    const handleProductClick = async (id: string) => {
      const res = await fetch(`http://localhost:3000/api/products/id/${id}`);
      const data = await res.json();
      setProductDetails(data);
    };
    handleProductClick(`${productId}`);
  }, []);
  const checkFavItems = async (productId: string) => {
    if (user.user && user.user.id) {
      const userInfo = await findUser(`${user.user.id}`);
      if (userInfo.fav.length) {
        const fav = userInfo.fav[0].list.filter(
          (item: List) => item.product.id === productId
        );

        if (fav.length) {
          setIsFav(true);
        }
      }
    }
  };
  useEffect(() => {
    checkFavItems(`${productId}`);
  }, [user.user]);

  const hanldeOnClickSaved = async (id: string) => {
    if (user.user && user.user.id) {
      const userInfo = await findUser(`${user.user.id}`);
      const data = { userId: userInfo.id, productId: id };
      if (userInfo.fav.length) {
        await fetch(`http://localhost:3000/api/fav`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`http://localhost:3000/api/fav`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
    }
    setIsFav(true);
  };

  return (
    <div>
      <h2 className="py-3 px-5 brand-type mt-3">BellaGlo.</h2>
      <div className="my-3 container ">
        {productDetails && (
          <div className="d-flex flex-row justify-content-between gap-5 details-container">
            {" "}
            <img
              src={productDetails.imgURL}
              alt="product img "
              className="w-50 h-50 img-fluid"
            />
            <div className="d-flex flex-column  align-item-center gap-4">
              <h5>BellaGlo • {productDetails.type}</h5>
              <h3>{productDetails.name}</h3>
              <p className=" fs-3 ">
                {productDetails.sale ? (
                  <span className="text-danger">
                    ${productDetails.salePrice}
                  </span>
                ) : (
                  <span>${productDetails.price}</span>
                )}
              </p>

              <div>
                Description: <p>{productDetails.description}</p>
              </div>

              <div>
                <button
                  className="btn btn-dark"
                  onClick={async () => {
                    user.isSignedIn
                      ? await addToCartWithUser(`${`${productDetails.id}`}`)
                      : navigate("/sign-in");
                  }}
                >
                  Add to cart
                </button>
                {isFav ? (
                  <p className="text-secondary mt-4 ">⭐️ Saved product</p>
                ) : (
                  <p className="text-secondary mt-4 ">
                    <button
                      className="btn custom-btn"
                      onClick={() => {
                        hanldeOnClickSaved(`${productDetails.id}`);
                      }}
                    >
                      ⭐️ Save the product
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
