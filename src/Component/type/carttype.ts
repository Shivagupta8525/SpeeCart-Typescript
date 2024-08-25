interface Product {
    id: number;
    price: number;
    [key: string]: any;
  }
  
  interface CartItem {
    product: Product;
    quantity: number;
  }
  
 export  interface CartProps {
    cart: CartItem[];
    updateCart: (newCart: Record<number, number>) => void;
  }