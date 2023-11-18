import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { findUser } from "../../middleware/Auth";

type OrderType = {
  id: string;
  createdAt: string;
  amount: number;
  address: string;
  phone: string;
  name: string;
  completed: boolean;
  note: string;
  products: Products[];
};

type Products = {
  product: {
    id: string;
    name: string;
    type: string;
    price: number;
    imgURL: string;
  };
};

function MyOrders() {
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const user = useUser();
  useEffect(() => {
    const fetchOrders = async () => {
      if (user.user && user.user.id) {
        const userInfo = await findUser(`${user.user.id}`);

        const res = await fetch(
          `http://localhost:3000/api/orders/user/${userInfo.id}`
        );
        const data = await res.json();
        setOrders(data);
      }
    };
    fetchOrders();
  }, [user.user]);

  return (
    <div>
      <h2 className="text-center">My orders</h2>
      {orders &&
        orders.map((order: OrderType) => {
          return <div key={order.id}>{order.createdAt.slice(0, 10)}</div>;
        })}
    </div>
  );
}

export default MyOrders;
