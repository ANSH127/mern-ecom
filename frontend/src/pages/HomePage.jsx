import Card from "../components/Card";
import Loadar from "../components/Loadar";
import React from "react";
export default function HomePage() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/product/getproduct"
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
    <div className="sm:w-4/5 w-full mx-auto text-white ">
      {
        loading ? <Loadar /> :
        <div className="flex flex-wrap justify-around sm:justify-start gap-y-4 py-4">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
        
      </div>}
    </div>
  );
}
