import { useEffect, useState } from "react";

const imagesURL = ["/1.avif", "/2.avif", "/3.avif"];

function Slide() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagesURL.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="slide-container text-center ">
      <img
        src={imagesURL[index]}
        alt="beauty pics"
        className="img-fluid h-50 w-50  py-2 rounded-1"
      />
    </div>
  );
}

export default Slide;
