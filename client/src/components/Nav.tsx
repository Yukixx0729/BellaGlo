function Nav() {
  return (
    <div className="d-flex flex-row justify-content-between nav-container">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/skin">
            Skin
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/body">
            Body
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/hair">
            Hair
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/sale">
            Sale
          </a>
        </li>
      </ul>
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
    </div>
  );
}

export default Nav;
