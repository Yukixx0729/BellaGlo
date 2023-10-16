function MyAccount() {
  return (
    <div className="dropdown">
      <button
        className="btn  dropdown-toggle dropdown-btn"
        type="button"
        data-bs-toggle="dropdown"
      >
        My account
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item text-center" href="/profile">
            My profile
          </a>
        </li>
        <li>
          <a className="dropdown-item text-center" href="/orders">
            My orders
          </a>
        </li>
        <li>
          <a className="dropdown-item text-center" href="/sign-out">
            sign out
          </a>
        </li>
      </ul>
    </div>
  );
}

export default MyAccount;
