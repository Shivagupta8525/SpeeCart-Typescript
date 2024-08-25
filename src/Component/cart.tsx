
import { Link } from 'react-router-dom';
import CartList from "./CartList";
import { withCart } from "./withProvider";
import { CartProps } from './type/carttype';



function Cart({ cart }:CartProps) {
    const productIds = Object.keys(cart);

    const Total = cart.reduce((acc, item) => {
        const product = item.product || {};
        return acc + (product.price * item.quantity);
    }, 0);


    if (productIds.length == 0) {
        return (
            <div className="flex flex-col gap-6 mx-auto">
                <h1 className="bold text-3xl">Your Cart Is Empty</h1>
                <div className="flex justify-center">
                    <Link className="border rounded-md bg-orange-500 text-white px-4 py-1" to="/">Home</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto bg-white border my-10 py-10 px-16  ">
            <h1 className="text-4xl text-gray-400">Cart</h1>
            <div className="  ">
                <div >
                    <CartList

                    />
                </div>

            </div>
            <div className="border self-end sm:mx-8 flex flex-col gap-4 min-w-80 max-w-96 px-4 py-2">
                <h1 className="px-2 py-2 bold text-xl bg-gray-100">Cart totals</h1>
                <div className="flex flex-col gap-2">
                    <div className="px-2 flex gap-16 justify-between">
                        <h2>Subtotal</h2>
                        <h2>${Total}</h2>
                    </div>
                    <hr />
                    <div className="px-2 flex gap-16 justify-between">
                        <h2>Total</h2>
                        <h2>${Total}</h2>
                    </div>
                    <hr />
                </div>
                <button className="border rounded-md bg-red-500 text-white px-4 py-2">Proceed To Checkout</button>
            </div>
        </div>
    )
}
export default withCart(Cart);