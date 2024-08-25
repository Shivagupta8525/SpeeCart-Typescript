import { createContext } from "react";

type UserValueType={
    user:{}|undefined,
    setUser: React.Dispatch<React.SetStateAction<User |undefined>>,
    isloggedIn:boolean,
  }
  export interface User {
    id: number;
    full_name: string;
    email: string;
    
  }

export const UserContext=createContext<UserValueType>({user: {},
    setUser: () => {},
   isloggedIn:false,
  });



  export interface Alert {
  
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }
  
  
  interface AlertContextType {
    alert: Alert | undefined;
    setAlert: (alert: Alert) => void;
    removeAlert: () => void;
  }
export const AlertContext=createContext<AlertContextType>({alert: undefined,
    setAlert: () => {},
    removeAlert: () => {},});

    interface CartContextType {
        cartItems: { [key: number]: number };
        onAddtoCart: (productId: number, no: number) => void;
        updateCart: (newCart: { [key: number]: number }) => void;
        totalCount: number;
      }

export const CartContext=createContext<CartContextType>({
    cartItems: {},
    onAddtoCart: () => {},
    updateCart: () => {},
    totalCount: 0,
}); 
 
