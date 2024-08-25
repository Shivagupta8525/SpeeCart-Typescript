import React from 'react'
import { Navigate } from 'react-router-dom'
import { withUser } from './withProvider'


function UserRoute({user,children}) {
  if(!user){
    console.log("user rinining")
   return <Navigate to='/login' replace></Navigate>
  }
 return children
}
export default withUser(UserRoute);
