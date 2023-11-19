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

  const handleOnClick = () => {};
  useEffect(() => {
    const fetchOrders = async () => {
      if (user.user && user.user.id) {
        const userInfo = await findUser(`${user.user.id}`);

        const res = await fetch(
          `http://localhost:3000/api/orders/user/${userInfo.id}`
        );
        const data = await res.json();
        setOrders(data);
        console.log(data);
      }
    };
    fetchOrders();
  }, [user.user]);

  return (
    <div className="orders-display mx-3 my-3">
      <h2 className="text-center">My orders</h2>

      {orders &&
        orders.map((order: OrderType) => {
          return (
            <div key={order.id} className="my-4 mx-2">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Date: {order.createdAt.slice(0, 10)}
                </li>
                <li className="list-group-item">
                  Order No: {order.id.slice(0, 8)}
                </li>
                <li className="list-group-item">
                  Amount: ${(order.amount / 100).toFixed(2)}
                </li>
                <li className="list-group-item">
                  Status:{" "}
                  {order.completed ? (
                    <span>Completed</span>
                  ) : (
                    <span className="text-danger">Pending</span>
                  )}
                </li>
                <li className="list-group-item">Receiver: {order.name}</li>

                <li className="list-group-item">Address: {order.address}</li>
                <li className="list-group-item">
                  Contact number: {order.phone}
                </li>
                <li className="list-group-item">
                  <ul className="list-group list-group-flush">
                    <h5>Products</h5>
                    {order.products.map((product) => {
                      return (
                        <li className="list-group-item">
                          1 X {product.product.name}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default MyOrders;
