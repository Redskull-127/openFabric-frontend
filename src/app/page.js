/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import DialogeBox from "./components/Dialoge";
import Link from "next/link";

async function getData() {
  const res = await fetch("https://openfabric-backend-vycn.onrender.com", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("token"),
    },
    "authorization": "Bearer " + sessionStorage.getItem("token"),
  }).then((res) => {
    if(res.status === 200){
      return res.json();
    }
    if(res.status === 403 || 500) {
      window.location.href = "/login";
    }
  })
  return res;
}

export default function Home() {
  const [showDial, setShowDial] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);
  if (data?.length === 0) return <div>Loading...</div>;
  if (data?.length > 0)
    return (
      <main className="flex min-h-screen flex-col items-center justify-start p-12">
        {showDial == true ? <DialogeBox setShowDial={setShowDial} /> : null}
        <h1 className="text-3xl text-start w-full">
          All Products <br />{" "}
          <span
            onClick={() => {
              setShowDial(true);
              console.log(showDial);
            }}
            className="text-xl my-2 p-2 bg-gray-600 rounded-xl cursor-pointer"
          >
            Add Data
          </span>
        </h1>
        <div className="my-12 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          {data.map((item, index) => {
            return (
              <Link
                href={`/details/${item._id}`}
                key={index}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                
              >
                <img
                  src={item.image}
                  className="mb-3"
                  alt={item.title}
                  width={200}
                  height={200}
                />
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  {item.title}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  {item?.description}
                </p>
              </Link>
            );
          })}
        </div>
      </main>
    );
}
