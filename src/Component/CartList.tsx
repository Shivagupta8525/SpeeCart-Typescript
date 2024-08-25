import { useState, useEffect } from "react";
import CartRow from "./cartRow";
import { withCart } from "./withProvider";
import { CartProps } from "./type/carttype";

function CartList({ cart, updateCart }: CartProps) {
  const [localCart, setLocalCart] = useState({});

  const cartToQuantityMap = () =>
    cart.reduce(
      (m, cartItem) => ({ ...m, [cartItem.product.id]: cartItem.quantity }),
      {}
    );

  useEffect(
    function () {
      setLocalCart(cartToQuantityMap);
    },
    [cart]
  );

  function handleChange(productId: number, newValue: number) {
    const newLocalCart = { ...localCart, [productId]: newValue };

    setLocalCart(newLocalCart);
  }

  function handleRemove(productId: number) {
    const newCart = cartToQuantityMap();
    delete newCart[productId];
    updateCart(newCart);
  }
  function updateMyCart() {
    const update = { ...localCart };
    updateCart(update);
  }
  console.log(cart);

  return (
    <>
      <div className="flex border bg-gray-200 ">
        <div className="flex w-1/2 items-center justify-center font-bold">
          <h3 className="bold text-1xl ">Product</h3>
        </div>
        <div className="flex items-center gap-10 bg--600 ">
          <h3 className="font-bold px-10  ">Price</h3>
          <h3 className="font-bold px-10">Quantity</h3>
          <h3 className="font-bold px-10">SubTotal</h3>
        </div>
      </div>
      {cart.map((item)=> {
        return (
          <CartRow
            id={item.product.id}
            key={item.product.id}
            quantity={localCart[item.product.id] || item.quantity}
            product={item.product}
            onQuntityChange={handleChange}
            onRemove={handleRemove}
          />
        );
      })}
      <div className="flex py-2 justify-between px-2">
        <div className="flex gap-2">
          <input
            className="border border-gray-200 py-1 px-2"
            type="text"
            placeholder="Coupon Code"
          ></input>
          <button className="border rounded-md bg-red-500 px-6 text-white">
            Apply Coupon
          </button>
        </div>
        <button
          onClick={updateMyCart}
          className="border rounded-md bg-red-500 px-6 text-white"
        >
          {" "}
          Update Cart{" "}
        </button>
      </div>
    </>
  );
}
export default withCart(CartList);
