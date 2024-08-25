import React, { useContext } from 'react'
import { AlertContext, CartContext, UserContext } from './context';


function withProvider(provider) {
  function myHOC(IncomingComponent) {
    function OutgoingComponent(props) {
      const contextData = useContext(provider)
      return <IncomingComponent {...props} {...contextData} />
    }
    return OutgoingComponent
  }
  return myHOC;
}
export default withProvider;
export const withUser = withProvider(UserContext);
export const withAlert = withProvider(AlertContext);
export const withCart = withProvider(CartContext);



