import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { createNewUser, findUser } from "../middleware/Auth";

function Account() {
  const user = useUser();
  // const [user, setUser] = useState(" ");
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { id, emailAddress } = user.user.primaryEmailAddress;
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
            <a className="nav-link active" aria-current="page" href="/account">
              My account
            </a>
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
            Cart
          </a>
        </li>
      </ul>
    </>
  );
}

export default Account;
