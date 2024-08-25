import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { withUser } from './withProvider'
import { User } from './context'

 type AuthRouteProps={
  user:User ,
  children:any,
 }

const  AuthRoute:FC<AuthRouteProps>=({user,children}) => {
  if(user){
    console.log("rinining")
   return <Navigate to='/' replace></Navigate>
  }
 return children
}

export default  withUser(AuthRoute);
