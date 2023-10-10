const products = [
  {
    src: "/4.avif",
    text: [
      "Timeless Beauty with our Rose Luxury",
      "Crafted by Top Lab Experts.",
      "Infused with Powerful Vitamin C, E, and Superior Moisture Shield",
      "Against ageing and wrinkle issues.",
    ],
  },
  {
    src: "/5.avif",
    text: [
      "Timeless Beauty with our Rose Luxury",
      "Crafted by Top Lab Experts.",
      "Infused with Powerful Vitamin C, E, and Superior Moisture Shield",
      "Against ageing and wrinkle issues.",
    ],
  },
  {
    src: "/6.avif",
    text: [
      "Timeless Beauty with our Rose Luxury",
      "Crafted by Top Lab Experts.",
      "Infused with Powerful Vitamin C, E, and Superior Moisture Shield",
      "Against ageing and wrinkle issues.",
    ],
  },
];

function ProductsAd() {
  return (
    <div>
      {products.map((product) => {
        return (
          <div className="d-flex flex-row px-5 py-5 justify-content-center">
            <img
              src={product.src}
              alt="product ad"
              className="mg-fluid h-50 w-50 rounded"
            />
            <div className="card px-5 py-2 product-ad">
              <div className="card-body ">
                <h5 className="card-title py-3">{product.text[0]}</h5>
                <p className="card-text py-2">{product.text[1]}</p>
                <p className="card-text py-2">{product.text[2]}</p>
                <p className="card-text py-2">{product.text[3]}</p>
                <a href="#" className="card-link py-2">
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
