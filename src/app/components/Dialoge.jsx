import { useRef } from "react"

export default function DialogeBox({ setShowDial }) {
    const obj ={}
    return <dialog className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-8 w-full">
            <h1 className="text-3xl text-start flex justify-between w-full">
                <span>Add Data</span>
                <span className="cursor-pointer" onClick={() => {
                    setShowDial(false)
                }}>x</span>
            </h1>
            <br />
            <form className="flex flex-col">
                <input
                    type="text"
                    onChange={(e)=>{
                        obj.title = e.target.value
                    }}
                    placeholder="Title"
                    className="border border-gray-300 rounded-lg p-2 my-2"
                />
                <input
                    type="text"
                    onChange={(e)=>{
                        obj.description = e.target.value
                    }}
                    placeholder="Description"
                    className="border border-gray-300 rounded-lg p-2 my-2"
                />
                <input
                    type="text"
                    onChange={(e)=>{
                        obj.image = e.target.value
                    }}
                    placeholder="Image"
                    className="border border-gray-300 rounded-lg p-2 my-2"
                />
                <input
                    type="text"
                    onChange={(e)=>{
                        obj.price = e.target.value
                    }}
                    placeholder="Price"
                    className="border border-gray-300 rounded-lg p-2 my-2"
                />
                <input
                    type="text"
                    onChange={(e)=>{
                        obj.rating = e.target.value
                    }}
                    placeholder="Rating"
                    className="border border-gray-300 rounded-lg p-2 my-2"
                />
                <button
                    type="submit"
                    onClick={(e)=>{
                        e.preventDefault()
                        fetch("http://localhost:5000/",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(obj)
                        })
                        .then(res=>res.json())
                        .then(data=>{
                            console.log(data)
                            setShowDial(false)
                        })
                    }}
                    className="bg-gray-600 text-white rounded-lg p-2 my-2"
                >
                    Submit
                </button>
            </form>
        </div>
    </dialog>
}