import React, { FC }  from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logoBlack.png"
import { GrShop } from "react-icons/gr";
import { VscAccount } from "react-icons/vsc";
import { withCart, withUser } from './withProvider';

type Headerprops={
    totalCount:number;
    setUser:any;
}



const  Header:FC<Headerprops>=({ totalCount, setUser }) =>{
    const handelLogout = () => {
        localStorage.removeItem("token");
        setUser(undefined);
    }

    return (
        < div className="bg-white py-1   ">
            <div className="  max-w-6xl mx-auto  flex justify-between items-center ">
                <Link to={'/'}>
                    <img className="h-20 " src={logo} alt="logo.png" />
                </Link>
                <div className='flex gap-4   '>
                    <div  >
                        <Link to="/login" className="text-orange-400 font-bold text-4xl  "> <VscAccount /></Link>
                    </div>
                    <button className='border rounded-full' onClick={handelLogout}>logout</button>
                    <div className="flex flex-col items-center">
                        <Link to="/my_cart">
                            <GrShop className=' text-4xl text-orange-400' />
                            <p className=' -mt-6 ml-3 text-orange-400'>{totalCount}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withUser(withCart(Header));