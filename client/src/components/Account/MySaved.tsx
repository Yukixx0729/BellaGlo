import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { findUser } from "../../middleware/Auth";
import { useCart } from "../../middleware/CartContext";
import { useNavigate } from "react-router-dom";
export type List = {
  favouriteId: string;
  id: string;
  product: {
    id: string;
    name: string;
    type: string;
    price: number;
    sale: boolean;
    salePrice: number;
    imgURL: string;
  };
  productId: string;
};

function MySaved() {
  const navigate = useNavigate();
  const [list, setList] = useState<List[] | null>(null);
  const user = useUser();
  const { addToCartWithUser } = useCart();
  const fetchList = async () => {
    if (user.user && user.user.id) {
      const userInfo = await findUser(`${user.user.id}`);
      console.log(userInfo.fav[0].list);
      setList(userInfo.fav[0].list);
    }
  };
  useEffect(() => {
    fetchList();
  }, [user.user]);

  const handleDelete = async (favId: string, productId: string) => {
    const data = { favouriteId: favId, productId: productId };
    await fetch("http://localhost:3000/api/fav", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await fetchList();
  };
  return (
    <div className="mx-3 my-3 saved-items ">
      <h3 className="text-center ">My Items</h3>

      <div>
        {list && list.length ? (
          list.map((item) => {
            return (
              <div
                key={item.id}
                className="d-flex  my-4 mx-5 gap-2 mb-3 list-container"
              >
                <img
                  src={item.product.imgURL}
                  className=" img-thumbnail img-fluid p-2"
                />
                <div className="d-flex flex-column p-2  px-3 py-3 ">
                  <p
                    onClick={() => navigate(`/product/${item.product.id}`)}
                    className="saved-title"
                  >
                    {item.product.name}
                  </p>
                  {item.product.sale ? (
                    <p className="text-danger price">
                      On sale now: ${item.product.salePrice}
                    </p>
                  ) : (
                    <p className="price">${item.product.price}</p>
                  )}
                </div>
                <div className="d-flex flex-column gap-3 ms-auto p-2 py-3 list-btn">
                  <div>
                    <button
                      className="btn custom-button"
                      onClick={async () => {
                        user.isSignedIn
                          ? await addToCartWithUser(`${`${item.product.id}`}`)
                          : navigate("/sign-in");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn custom-button"
                      onClick={() => {
                        handleDelete(
                          `${item.favouriteId}`,
                          `${item.product.id}`
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="tips">You haven't saved any products yet.</div>
        )}
      </div>
    </div>
  );
}

export default MySaved;
