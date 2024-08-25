import  { ReactNode,FC, useEffect, useState } from "react";
import { CartContext } from "../context";
import { withUser } from "../withProvider";
import { getCart, saveCart, getProductByIds } from "../api";



type CartProviderProps = {
  isLoggedIn: boolean;
    children: ReactNode,
}
type Product = {
  id: number;
  [key: string]: any;
};
type  CartItem ={
  product: Product;
  quantity: number;
}
type QuantityMap={
  [key: number]: number;
}


interface CartContextProps{
  cart: CartItem[];
  updateCart: (newCart: QuantityMap) => void;
  handleAddTocart: (productId: number, count: number) => void;
  totalCount: number;
}

const CartProvider:FC <CartProviderProps> =({ isLoggedIn, children })=> {

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(function () {
    if (!isLoggedIn) {
      const saveDatastring :string = localStorage.getItem('Cart') || "{}";
      const saveData = JSON.parse(saveDatastring);
      quantityMapToCart(saveData);
    }
    else {
      getCart().then(function (response) {
        setCart(response);
      })
    }
  }, [isLoggedIn]);

  function quantityMapToCart(quantityMap:QuantityMap) {
    getProductByIds(Object.keys(quantityMap)).then(function (products) {
      const savedCart = products.map((p:Product) => ({
        product: p,
        quantity: quantityMap[p.id],
      }));
      setCart(savedCart);
    });
  }
console.log("cart provider is called",cart)

  function handleAddTocart(productId:number, count:number) {
    const quantityMap :QuantityMap= cart.reduce(
      (m, cartItem) => ({ ...m, [cartItem.product.id]: cartItem.quantity }),
      {}
    );

    const oldCount = quantityMap[productId] || 0;
    const newCart = { ...quantityMap, [productId]: oldCount + count };
    updateCart(newCart);
  }

  function updateCart(newCart:{}) {
    if (isLoggedIn) {
      saveCart(newCart).then(function () {
        quantityMapToCart(newCart);
      });
    } else {
      const quantityMapString = JSON.stringify(newCart);
      localStorage.setItem("Cart", quantityMapString);
      quantityMapToCart(newCart);

    }

  }
  const totalCount = cart.reduce(function (previous, current) {
    return previous + current.quantity;

  }, 0);


  return (
    <CartContext.Provider value={{ cart, updateCart, handleAddTocart, totalCount }}>{children} </CartContext.Provider>)
    ;
}
export default withUser(CartProvider);