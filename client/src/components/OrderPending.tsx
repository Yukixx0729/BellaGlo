import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderPending() {
  const { id } = useParams();
  const [message, setMessage] = useState("Pending");
  useEffect(() => {
    const deletedCart = async () => {
      console.log(window.location.href.includes("success"));
      if (window.location.href.includes("success")) {
        await fetch(`http://localhost:3000/api/cart/${id}`, {
          method: "DELETE",
        });
        setMessage("Congrats, your order has been placed!");
      }
      if (window.location.href.includes("canceled")) {
        setMessage("Order has been canceled. ");
      }
    };
    deletedCart();
  }, []);
  return <div className="mx-2 my-2">{message}</div>;
}

export default OrderPending;
