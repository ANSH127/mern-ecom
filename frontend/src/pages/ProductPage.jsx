import Card from "../components/Card";
import Loadar from "../components/Loadar";
import React from "react";
import { useParams } from "react-router-dom";
export default function ProductPage() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  
  const { category } = useParams();
  console.log( category);
  

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://backend-sigma-ecru.vercel.app/api/products/category/${category.toLowerCase()}`
      );
      const data = await response.json();
      // console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="sm:w-11/12 w-full mx-auto text-white ">
      {
        loading ? <Loadar /> :
        <div className="flex flex-wrap justify-around sm:justify-start gap-y-4 py-4">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
        
      </div>}
    </div>
  );
}
