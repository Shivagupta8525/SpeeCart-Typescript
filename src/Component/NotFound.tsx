import React, { memo } from "react";
import { Link } from "react-router-dom";

function NotFound() {

    return (
        <div className="flex flex-col max-w-6xl justify-center items-center mx-auto sm:mx-2 gap-2    ">
            <img className=" w-80 h-60  aspect-square " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcKcoquPvJ-O9WfgEYiUF34hYhzaGcrtamQ&s" />
            <h1 className="text-2xl text-indigo-700"> Product Not found </h1>
            <p className=" text-lg mx-auto lg:text-xl  px-4"> We're sorry, that product you requested colud not be found Please go back to homepage.</p>
            <Link to="/ProductListPage" className="rounded-full text-xl py-0.5  bg-orange-500 px-2" >Go Home</Link>
        </div>
    )
}

export function PageNotFound() {
    return (
        <div className="flex flex-col max-w-6xl justify-center items-center mx-auto h-full    ">
            <img className=" w-80 h-60  aspect-square" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcKcoquPvJ-O9WfgEYiUF34hYhzaGcrtamQ&s" />
            <h1 className="text-2xl text-indigo-700"> Page Not found </h1>
            <p className="text-xl"> We're sorry, the page you requested colud not be found Please go back to homepage.</p>
            <Link to="/" className="rounded-full text-xl py-0.5  bg-orange-500 px-2" >Go Home</Link>
        </div>
    )
}
export default memo(NotFound);



