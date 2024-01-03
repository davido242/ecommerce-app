"use client";
import React from 'react';
import { MouseEvent, useContext } from "react";
import { NameContext } from "../AuthContext/NameContext";
import { useRouter } from "next/navigation";

const CartBtn: React.FC<{someProps: string}> = (props) => {
  const { name } = useContext(NameContext);
  const router = useRouter();


  const handleCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(name == '') {
      alert("Please Login to add to cart..");
      router.push("/login");
    }else {
      alert(name);
    }
    
  }
  return (
    <button className='cart-btn' onClick={handleCart} dangerouslySetInnerHTML={{ __html: props.someProps }} />
  )
}

export default CartBtn;