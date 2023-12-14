import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { NameContext } from "../AuthContext/NameContext";

export default function header() {
  const { name, setName }: any = useContext(NameContext);
  const router = useRouter();

  const handleLogout = (e: any) => {
    e.preventDefault();
    alert("Log out?");
    localStorage.removeItem("token");
    setName("");
    router.push("/login")
  };

  return (
    <header className="bg-brown-bg fixed w-full z-[2]">
      <div className="container mx-auto px-8 py-2 flex justify-between">
        <ul className="flex gap-3">
          <div className="uppercase text-[#fff] font-bold text-2xl">
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
            <ul className="flex gap-3">
              <li>
                <Link
                  href=""
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4"
                >
                  Logout
                </Link>
              </li>
              <li>{`Hi ${name}`}</li>
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
