"use client";
import "@/app/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NameContext } from "./AuthContext/NameContext";
import { ProductContext } from "./AuthContext/ProductContext";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "My First Ecommerce app with NextJs",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [products, setProducts] = useState(null);
  const [loading, setloading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setloading(true);
    fetch("http://localhost:5001/api/dashboard", {
      method: "GET",
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setloading(false);
        if (!localStorage.getItem("token")) {
          router.push("/login");
        } else if (data.name == undefined) {
          alert("Session Expired, Please Login.");
          router.push("/login");
        } else {
          setName(data.name);
        }
      })
      .catch((error) => {
        setloading(false);
        console.log("🚀 ~ file: layout.tsx:44 ~ useEffect ~ error:", error);
      });
  }, []);

  return (
    <html lang="en">
      <body>
        <NameContext.Provider value={{ name, setName }}>
          {loading ? (
            <div>Loading</div>
          ) : (
            <ProductContext.Provider value={{ products, setProducts }}>
              <Header />
              {children}
              <Footer />
            </ProductContext.Provider>
          )}
          </NameContext.Provider>
      </body>
    </html>
  );
}
