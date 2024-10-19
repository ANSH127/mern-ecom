import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

import Image1 from "../assets/images/3_WebBanner_1920x1080_4_1400x.webp";
import Image2 from "../assets/images/4_WebBanner_1920x1080_2_1400x.webp";
import Image3 from "../assets/images/5_WebBanner_1920x1080_2_1400x.webp";

import Card from "../components/Card";

import trending1 from "../assets/images/8_Suits.webp";
import trending2 from "../assets/images/3_Denims.webp";
import trending3 from "../assets/images/Trousers_2.webp";
import trending4 from "../assets/images/4_Printed_Shirts.webp";

export default function LandingPage() {
  const [products, setProducts] = React.useState([]);
  const [selectedCategory, setSelectedCategory] =
    React.useState("NEW ARRIVALS");

  const [selectedCategory2, setSelectedCategory2] =
    React.useState("SHORTS");

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://backend-sigma-ecru.vercel.app/api/products/all"
      );
      const data = await response.json();
      // console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="sm:w-11/12 w-full mx-auto text-white">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        interval={8000}
        stopOnHover={false}
        className="p-2"
      >
        <div>
          <img src={Image1} alt="Image 1" />
        </div>
        <div>
          <img src={Image2} alt="Image 2" />
        </div>
        <div>
          <img src={Image3} alt="Image 3" />
        </div>
      </Carousel>

      <div className="bg-white p-4">
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className={`px-2 py-2 text-sm rounded-3xl
              border-black border ${
                selectedCategory === "NEW ARRIVALS"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            onClick={() => setSelectedCategory("NEW ARRIVALS")}
          >
            NEW ARRIVALS
          </button>
          <button
            className={`px-2 py-2 text-sm rounded-3xl
          border-black border ${
            selectedCategory === "MOST TRENDING"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
            onClick={() => setSelectedCategory("MOST TRENDING")}
          >
            MOST TRENDING
          </button>
        </div>

        <div className="flex overflow-x-auto space-x-4 py-4">
          {products.map((product) => (
            <div key={product._id} className="flex-shrink-0">
              <>
                <Card product={product} />
              </>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white  p-4">
        <h2 className="text-3xl font-light text-center text-black">
          TRENDING NOW
        </h2>
        <div className="flex flex-wrap justify-center gap-10 py-4 ">
          <div className="h-auto w-72 ">
            <img src={trending1} alt="Trending 1" />
          </div>

          <div className="h-auto w-72 ">
            <img src={trending2} alt="Trending 2" />
          </div>

          <div className="h-auto w-72 ">
            <img src={trending3} alt="Trending 3" />
          </div>

          <div className="h-auto w-72 ">
            <img src={trending4} alt="Trending 4" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4">
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className={`px-2 py-2 text-sm rounded-3xl
              border-black border ${
                selectedCategory2 === "SHORTS"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            onClick={() => setSelectedCategory2("SHORTS")}
          >
            SHORTS
          </button>
          <button
            className={`px-2 py-2 text-sm rounded-3xl
          border-black border ${
            selectedCategory2 === "TROUSERS"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
            onClick={() => setSelectedCategory2("TROUSERS")}
          >
            TROUSERS
          </button>
        </div>

        <div className="flex overflow-x-auto space-x-4 py-4">
          {products.map((product) => (
            <div key={product._id} className="flex-shrink-0">
              <>
                <Card product={product} />
              </>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}