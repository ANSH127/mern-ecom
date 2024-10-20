import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Card({ product }) {
  const [imageUrl, setImageUrl] = useState(product.imageUrl);

  const handleMouseEnter = () => {
    setImageUrl(product.hoverImageUrl?product.hoverImageUrl:product.imageUrl);
  };

  const handleMouseLeave = () => {
    setImageUrl(product.imageUrl);
  };
  return (
    <Link to={`/productdetail/${product._id}`}>
      <div className="shadow-sm rounded-lg  sm:w-60  w-48 p-2  text-black  ">
        <img
          src={imageUrl}
          alt="product"
          className="w-full h-50 object-cover"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <div className="mt-4">
          <h2 className=" text-base">{product.name}</h2>

          <div className="flex mt-2">
            <StarIcon className="text-yellow-500" />
            <StarIcon className="text-yellow-500" />
            <StarIcon className="text-yellow-500" />
            <StarIcon className="text-yellow-500" />
            <StarBorderOutlinedIcon className="text-yellow-500" />
            {/* <p className="text-sm pt-0.5"> 
                26 reviews
            </p> */}
          </div>
          <p className=" text-sm mt-2">INR {product.price}</p>
        </div>
        {/* <div className='mt-4'>
            <button className='w-full py-2 rounded-lg bg-yellow-500 text-white'>
            Add to Cart
            </button>
        </div> */}
      </div>
    </Link>
  );
}
