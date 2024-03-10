import React from "react";
import Link from "next/link";
import AuthButton from "./auth-button";

const Navbar = () => {
  return (
    <div
      className="flex items-center justify-between max-w-7xl mx-auto w-[98%] rounded-full px-2 py-2 pl-6"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      }}
    >
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-8" />
        <h2 className="text-2xl font-bold">eFileBOI</h2>
      </div>

      <ul className="flex items-center gap-8">
        {["Home", "Financing", "Our Services", "Blog"].map((item, index) => {
          return (
            <li key={index}>
              <Link href="/">{item}</Link>
            </li>
          );
        })}
      </ul>

      <AuthButton type="mininal" />
    </div>
  );
};

export default Navbar;
