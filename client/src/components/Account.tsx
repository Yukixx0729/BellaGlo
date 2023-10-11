import { useState } from "react";

function Account() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <ul className="nav ">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/account">
            My account
          </a>
        </li>
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
