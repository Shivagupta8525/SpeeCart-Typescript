import React, { memo } from 'react';
import Product from './Product';



interface ProductType {
    id: number;
    
    [key: string]: any; 
  }

interface ProductlistProps {
    products: ProductType[];
  }

function Productlist({ products }:ProductlistProps) {
    return (<> 
        <div className=" md:grid   md:grid-cols-3  gap-2 space-y-2 md:space-y-0 "  >
            {products.map(function (items) {
                return <Product key={items.id} {...items} />; 
            })}  
        </div>
    </>
    );
}
export default memo(Productlist); 