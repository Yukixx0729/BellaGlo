import Account from "./Account";

function Nav() {
  return (
    <div className="d-flex flex-row justify-content-between nav-container px-2">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/type/face">
            Face
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/type/body">
            Body
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/type/hair">
            Hair
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/type/sale">
            Sale
          </a>
        </li>
      </ul>
      <Account />
    </div>
  );
}

export default Nav;
