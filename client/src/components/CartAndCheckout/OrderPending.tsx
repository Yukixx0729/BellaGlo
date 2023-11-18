import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { findUser } from "../../middleware/Auth";
function OrderPending() {
  const user = useUser();

  const { orderId } = useParams();
  const [message, setMessage] = useState("Pending");
  useEffect(() => {
    const deletedCart = async () => {
      if (user && user.user) {
        const userData = await findUser(`${user.user.id}`);
        if (window.location.href.includes("success")) {
          await fetch(`http://localhost:3000/api/orders/order/${orderId}`, {
            method: "PUT",
          });

          if (userData && userData.cart && userData.cart[0]) {
            await fetch(
              `http://localhost:3000/api/cart/${userData.cart[0].id}`,
              {
                method: "DELETE",
              }
            );
            window.location.reload();
          }

          setMessage("Congrats, your order has been placed!");
        }
        if (window.location.href.includes("canceled")) {
          setMessage("Order has been canceled. ");
        }
      }
    };
    deletedCart();
  }, [user]);
  return <div className="mx-2 my-2">{message}</div>;
}

export default OrderPending;
