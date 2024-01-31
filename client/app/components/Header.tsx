import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, MouseEvent } from "react";
import { NameContext } from "../AuthContext/NameContext";
import { CartContext } from "../AuthContext/CartContext";
import Image from "next/image";

export default function header() {
  const { name, setName }: any = useContext(NameContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const router = useRouter();

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setName("");
    router.push("/login");
  };

  const goToCart = () => {
    router.push("/cart")
  }

  return (
    <header className="bg-amber-600 fixed w-full z-[2]">
      <div className="container mx-auto px-8 py-2 flex justify-between">
        <ul className="flex items-center gap-3">
          <div className="uppercase text-white font-bold text-2xl">
            <Link href="/">Logo</Link>
          </div>
          {name == "" ? null : (
            <Link href="/dashboard" className="pt-1">
              Dashboard
            </Link>
          )}
        </ul>
        <div>
          {name == "" ? (
            <ul className="flex gap-3">
              <li>
                <Link href="/signup">Register</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center gap-3">
              <button onClick={goToCart} className="relative cursor-pointer pt-1">
                <Image src="/assets/images/cart.svg" alt="cart icon" width="30" height="30" />
                  {cartItems.length === 0 ? "" : (<span className="absolute top-1 -right-1 bg-[#e16800] h-6 w-6 flex justify-center rounded-full items-center text-[12px] font-bold">
                  {cartItems.length}
                </span>)}                
              </button>
              <li>
                <button onClick={handleLogout} className="cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-2 md:p-4">
                  Logout
                </button>
              </li>
              <li className="hidden md:block">{`Hi ${name}`}</li>
              <li>
                <span className="animate-ping inline-flex h-full w-full rounded-full bg-sky-400 opacity-75">O</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
