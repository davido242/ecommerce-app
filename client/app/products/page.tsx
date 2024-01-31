"use client";
import { FormEvent, useState, useRef } from "react";

export default function page() {
  const [errorMsg, setErrorMessage] = useState("");

  const nameRef = useRef<HTMLInputElement | null>(null);
  const sizeRef = useRef<HTMLSelectElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = new FormData();
    body.set("name", nameRef.current.value ?? "");
    body.set("size", sizeRef.current.value ?? "");
    body.set("price", priceRef.current.value ?? "");
    body.set("image", imgRef.current.files[0] ?? "");

    console.log(imgRef.current?.files[0]);
    // return;

    fetch("http://localhost:5001/product/add-products", {
      method: "POST",
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.message);
        } else if (!data.error) {
          setErrorMessage(data.message);
        }
      });
  };

  return (
    <div className=" min-h-[calc(100vh-7vh)] pt-2">
      <div className="container mx-auto px-8">
        <div className="bg-amber-600 mt-32 p-4 rounded max-w-[500px] mx-auto">
          <h3 className="text-center font-bold py-4">Add/Upload Products to Store</h3>
          {errorMsg == "" ? null : (
            <div style={{ color: "red" }} className="text-red-500 text-center">
              {"**"}
              {errorMsg}
              {"**"}
            </div>
          )}
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
            <input type="text" ref={nameRef} name="name" placeholder="Products Name" className="form-input" />
            <label>Choose Size:</label>
            <select id="size" ref={sizeRef} name="size" className="form-input">
              <option value="28">28</option>
              <option value="38">38</option>
              <option value="42" defaultValue="true">
                42
              </option>
              <option value="45">45</option>
            </select>
            <input
              type="number"
              ref={priceRef}
              name="price"
              placeholder="Price E.g. 500, 800 .."
              className="form-input"
            />
            <input type="file" ref={imgRef} name="image" className="cursor-pointer bg-[#efefef] p-2 form-input" />
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
