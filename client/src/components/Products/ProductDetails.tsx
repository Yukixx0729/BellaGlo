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
  description: string;
  type: string;
};

function ProductDetail() {
  const navigate = useNavigate();
  const user = useUser();
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
      console.log(productDetails);
    };
    handleProductClick(`${productId}`);
  }, []);
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
                <p className="text-secondary mt-4">⭐️ Save the product</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
