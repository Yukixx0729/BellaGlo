import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../middleware/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { List } from "../Account/MySaved";
import { findUser } from "../../middleware/Auth";

type ProductType = {
  id: string;
  name: string;
  sale: boolean;
  price: number;
  salePrice: number;
  imgURL: string;
};

const seriesPic = [
  { name: "rose", src: "/4.avif" },
  { name: "jojoba", src: "/5.avif" },
  { name: "greentea", src: "/6.avif" },
];
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
function Series() {
  const navigate = useNavigate();
  const { series } = useParams();
  const user = useUser();
  const { addToCartWithUser } = useCart();
  const [favList, setFavList] = useState<List[] | null>(null);
  const img = seriesPic.filter((item) => item.name === series);
  const [seriesData, setSeriesData] = useState<ProductType[] | null>(null);

  useEffect(() => {
    const getAllData = async (series: string) => {
      try {
        const res = await fetch(`${API_URL}/api/products/series/${series}`);
        const data = await res.json();
        console.log(data);
        setSeriesData(data);
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    };
    getAllData(`${series}`);
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
  useEffect(() => {
    checkFavItems();
  }, [user.user]);

  return (
    <div>
      <div className="brand-type px-3 py-2 my-3">
        <h2 className="py-2 px-3">BellaGlo.</h2>
        <h3 className="py-2 px-3">{series}</h3>
      </div>
      <div className="d-flex justify-content-center series-img py-2">
        <img src={img[0].src} className="w-50 h-50 " />
      </div>
      <div className="products d-flex flex-row gap-3 flex-wrap mx-4">
        {seriesData &&
          seriesData.map((product) => {
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
                    onClick={async () => {
                      user.isSignedIn
                        ? await addToCartWithUser(`${`${product.id}`}`)
                        : navigate("/sign-in");
                    }}
                    className="btn custom-button"
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

export default Series;
