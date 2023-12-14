"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useContext } from "react";
// import { ProductContext } from "../AuthContext/ProductContext";

export default function page() {
 
  const [products, setProducts] = useState([]);
  // const [products, setProducts]: any = useContext(ProductContext);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5001/api/products", {
      method: "GET",
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {       
        if(data.error) {
          router.push("/login");
        }
        else {     
          setProducts(data);
        }
      });
  }, []);



  return (
    <div className=" min-h-[calc(100vh-7vh)] pt-2">
      <div className="container mx-auto px-8">
        <div className="bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto">         
          <h2 className="text-center font-bold py-4">Available Products in the Store</h2>
          <ul className="list-disc pl-2">
            {products.map((product) => (
            <li key={product.id}>{product.product_name}</li>))}
          </ul>
          <h3 className="text-center font-bold py-4">Add/Upload Products to Store</h3>
          <form onSubmit={() => alert("Products added")} className="flex flex-col gap-4">
            <input type="text" name="product-name" placeholder="Products Name" className="form-input" />
            <label>Choose Size:</label>
            <select id="size" name="size" className="form-input">
              <option value="twoeight">28</option>
              <option value="threeeight">38</option>
              <option value="fourtwo" defaultValue="true">
                42
              </option>
              <option value="fourfive">45</option>
            </select>
            <input type="number" name="price" placeholder="Price E.g. 500, 800 .." className="form-input" />
            <div className="text-center mt-9 flex justify-evenly">
              <input
                type="submit"
                value="Add Products"
                className="cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
