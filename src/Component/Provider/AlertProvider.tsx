import  { useState } from "react";
import { Alert, AlertContext } from "../context";

type AlertProviderProps = {
  children: React.ReactNode,
}

function AlertProvider({children}:AlertProviderProps){
  const [alert, setAlert] = useState<Alert | undefined>();
   const removeAlert = () => {
        setAlert(undefined);
      }
     return ( <AlertContext.Provider value={{ alert, setAlert, removeAlert }} >{children}</AlertContext.Provider>);
 }
export default AlertProvider;
