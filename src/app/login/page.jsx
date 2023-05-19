'use client'

import { useRef } from "react"

export default function Login() {
    const nameRef = useRef()
    const passwordRef = useRef()
    return (
        <div className="w-full h-full flex flex-col p-12 justify-between items-center">
            <h1 className="text-3xl">Login</h1>
            <form className="flex flex-col my-20">
                <input
                    type="text"
                    ref={nameRef}
                    placeholder="Email"
                    className="border border-gray-300 text-black rounded-lg p-2 my-2"
                />
                <input
                    type="password"
                    ref={passwordRef}
                    placeholder="Password"
                    className="border border-gray-300 text-black rounded-lg p-2 my-2"
                />
                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault()
                        console.log(nameRef.current.value, passwordRef.current.value)
                        fetch("https://openfabric-backend-vycn.onrender.com/auth", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: nameRef.current.value,
                                password: passwordRef.current.value
                            })
                        })
                            .then(res => {
                                if (res.ok) {
                                    return res.json()
                                } else {
                                    throw new Error("Something went wrong")
                                }
                            }).then(data => {
                                sessionStorage.setItem("token", data.token)
                                window.location.href = "/"
                            })
                    }}
                    className="bg-gray-600 text-white rounded-lg p-2 my-2"
                >
                    Submit
                </button>
            </form>
            <p>use <strong>openfabric@gmail.com</strong> and <strong>openFabric</strong>!</p>
        </div>
    )
}