function Footer() {
  return (
    <div className="d-flex flex-column justify-content-center px-2 footer-container">
      <ul className="nav text-center d-flex flex-row justify-content-center">
        <li className="nav-item">
          <a className="nav-link footer-link" href="/about">
            About us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link footer-link" href="/contact">
            Contact us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link footer-link" href="/team">
            Our team
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link footer-link" href="/career">
            Career with us
          </a>
        </li>
      </ul>
      <div className="line"></div>
      <div className="text-center py-2">
        @2023 BellaAlo. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
