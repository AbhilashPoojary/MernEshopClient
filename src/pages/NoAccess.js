import React from "react";
import { Link } from "react-router-dom";

export default function NoAccess() {
  return (
    <section className="container">
      <div className="custom-height p-3 flex flex-col justify-center items-center">
        <h3 className="text-3xl text-orange-600 text-center font-bold">
          Whoops!
        </h3>
        <h3 className="text-xl text-indigo-900 text-center font-bold">
          404 Page Not Found
        </h3>
        <Link to="/" className="block underline text-blue-400">
          go to home
        </Link>
      </div>
    </section>
  );
}
