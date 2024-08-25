import  { ChangeEvent, memo } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { ImSpinner10 } from "react-icons/im";
import { Product } from "./type/ProductType";


interface CartRowProps {
    product: Product;
    quantity: number;
    onQuntityChange: (productId: number, newValue: number) => void;
    onRemove: (productId: number) => void;
  }


function CartRow({ product, onQuntityChange, quantity, onRemove }:CartRowProps) {

    function handleChange(event : ChangeEvent<HTMLInputElement>) {
        onQuntityChange(product.id, +event.target.value);
    }
    function handleCross() {
        onRemove(product.id);
        console.log("product id from cartrow", product.id);
    }
    if (!product) {
        return (<>
            <div className=" grow text-indigo-700 text-6xl h-full flex items-center justify-center"> <ImSpinner10 className="animate-spin" /></div>
        </>
        );
    }
    return (
        <div className=" flex border  grow ">
            <div className="w-1/2 flex items-center ">
                <button onClick={handleCross}
                    className="text-orange-500 text-2xl ml-8"><CiCircleRemove /></button>
                <img src={product.thumbnail} alt={product.title} className="w-20 h-16 ml-10 " />
                <span className="ml-12 text-orange-400 font-semibold">{product.title}</span>
            </div>
            <div className=" items-center w-1/2 justify-between flex gap-10">
                <div className="ml-10  w-20">${product.price}</div>
                <input type="number" className=" ml-10   w-10  border" value={quantity} onChange={handleChange} />
                <div className=" mx-12 ml-20   px-2 w-20">${(product.price * quantity).toFixed(2)}</div>
            </div>
        </div>
    );
}
export default memo(CartRow);