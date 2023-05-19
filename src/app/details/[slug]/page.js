/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import { useEffect, useState } from "react"

async function getData(id) {
  const res = await fetch(`https://openfabric-backend-vycn.onrender.com/find/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("token"),
    },
  }).then((res) => {
    if(res.status === 200){
      console.log(res);
      return res.json();
    }
  });
  return res;
}

export default function Page({ params }) {
  const [data, setData] = useState({});
  const slug = params.slug
  useEffect(() => {
    getData(slug).then((res) => {
      console.log(res);
      setData(res);
    });
  }, [slug]);
  if(data.title === undefined) return <div>Loading...</div>
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        <div className="w-full flex gap-5 justify-center items-center">
        <img src={data?.image} width={200} height={200} />
          <h1 className="text-3xl w-[400px]">{data?.title}<br/>
            <span className="text-lg my-2">{data?.description}</span>
            <br/>
            <span className="text-lg">Price - {data?.price}INR</span>
            <br />
            <span className="text-lg">{data?.rating || 0}/5</span>
            <br />
            <a href={data?.link} className="p-2 bg-slate-600 text-lg my-2 rounded-lg cursor-pointer" >Buy Now</a>
          </h1>
        </div>
    </div>
  )
}
