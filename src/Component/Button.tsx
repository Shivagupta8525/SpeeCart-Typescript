import React from 'react'

function Button(props:any ){

    return(
        <button 
        {...props} className="bg-orange-600 text-white rounded py-2 px-4"> 
</button>
    )
}
export default Button;