import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { createNewUser, findUser } from "../middleware/Auth";
import MyAccount from "./MyAccount";
import { useCart } from "../middleware/CartContext";

type userDataType = {
  id: string;
  emailAddress: string;
};

function Account() {
  const { cartCount } = useCart();
  const user = useUser();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { id, emailAddress } =
          (user.user?.primaryEmailAddress as userDataType) || null;
        const matchUser = await findUser(`${id}`);
        console.log(matchUser);
        if (!matchUser) {
          const newUser = await createNewUser(`${id}`, `${emailAddress}`);
          console.log(newUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <>
      <ul className="nav ">
        {isAuthPage ? null : user.isSignedIn ? (
          <li className="nav-item">
            <MyAccount />
          </li>
        ) : (
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/sign-in">
              Sign in
            </a>
          </li>
        )}

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/cart">
            cart ({cartCount})
          </a>
        </li>
      </ul>
    </>
  );
}

export default Account;
