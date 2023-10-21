const products = [
  {
    src: "/4.avif",
    text: [
      "Timeless Beauty with our Rose Luxury",
      "Crafted by Top Lab Experts.",
      "Infused with Powerful Vitamin C, E, and Superior Moisture Shield",
      "Against ageing and wrinkle issues.",
    ],
    url: "/series/rose",
  },
  {
    src: "/5.avif",
    text: [
      "Superior Moisture Shield with our Jojoba oil",
      "Special formula only with us.",
      "Nourish your skin with this botanical wonder, renowned for its moisturizing and skin-balancing properties. ",
      "Reveal your timeless beauty.",
    ],
    url: "/series/jojoba",
  },
  {
    src: "/6.avif",
    text: [
      "Rejuvenate your skin with our secret weapon",
      "Experience the revitalizing power of Green Tea.",
      "Combat the signs of aging and maintains your youthful glow.",
      "Against ageing and wrinkle issues.",
    ],
    url: "/series/greentea",
  },
];

function ProductsAd() {
  return (
    <div>
      {products.map((product, index) => {
        return (
          <div className="d-flex flex-row px-5 py-4 align-items-stretch justify-content-center products-ad">
            <img
              src={product.src}
              alt="product ad"
              className={`h-50 w-50 rounded products-img ${
                index % 2 === 0 ? "order-1" : null
              }`}
            />
            <div className="card px-5  product-card">
              <div className="card-body ">
                <h5 className="card-title py-2">{product.text[0]}</h5>
                <p className="card-text py-1">{product.text[1]}</p>
                <p className="card-text py-1">{product.text[2]}</p>
                <p className="card-text py-1">{product.text[3]}</p>
                <a
                  href={product.url}
                  className="card-link py-1 product-link  px-3"
                >
                  Explore now
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsAd;
